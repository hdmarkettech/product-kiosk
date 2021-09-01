import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GridContainer, Grid, Cell} from "react-foundation";
import Header from "../header/header";
import '../products/products.scss'
import ReactMarkdown from "react-markdown";
import Modal from 'react-modal'
import Swiper from 'react-id-swiper'
import closeButton from "../../assets/close-icon-white.svg";

const customStyles = {
    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    content : {
        position: 'relative',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
        border: 'none',
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        marginRight: '-50%'
    }
};
function getParent() {
    return document.querySelector('#root');
}
const swiperParams = {
    navigation: {
        nextEl: '.swiper-button-next.swiper-button-white',
        prevEl: '.swiper-button-prev.swiper-button-white'
    },
    spaceBetween: 0,
    centeredSlides: true,
    slidesPerView: 1,
    keyboard:{
        enabled: true
    }
}
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            modalIsOpen: false,
            size: 300,
            vh: 500
        }
        this.cellSize = React.createRef();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateSize = this.updateSize.bind(this)

    }
    openModal(image, index) {
        console.log('index', index);
        console.log('image', image);
        this.setState({modalIsOpen: true, imageURL: image});
        let background = document.querySelector('.background')
        background.style.position = 'fixed';
        swiperParams.initialSlide = index;
    }

    closeModal() {
        this.setState({modalIsOpen: false});
        let background = document.querySelector('.background')
        background.style.position = 'static';
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateSize.bind(this))
        let url = `/api/productPages?name=${this.props.match.params.product}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({data})
                this.updateSize()
            })
    }
    updateSize(){
        if(this.state.vh !== window.innerHeight){
            this.setState({vh: Math.round(window.innerHeight * .9)})
        }
        if(this.state.size !== this.cellSize.current.getBoundingClientRect().width){
            this.setState({size: this.cellSize.current.getBoundingClientRect().width})
        }
    }

    render() {
        if(this.state.data){
            return (
                <div>
                    <Modal className={'modal'}
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Product Modal"
                        parentSelector={getParent}>
                        <button onClick={this.closeModal}><img src={closeButton}/></button>
                        <Swiper {...swiperParams}>
                            {this.state.data.fields.productGalleryImages.map((image)=>{
                                return (
                                    <div  className={'imageHolder'}>
                                        <img src={`${image.fields.file.url}?h=${this.state.vh}`} alt={''} />
                                    </div>
                                )
                            })}
                        </Swiper>
                    </Modal>
                    <Header title={'Features & Benefits'}/>
                    <GridContainer full={true} className="wrapper" fluid={true}>
                        <Grid>
                            <Cell small={7}>
                                <ReactMarkdown className={'background product-info'} source={this.state.data.fields.pageContent} escapeHtml={false} />
                            </Cell>
                            <Cell small={5}>
                                <div className={'background product-gallery text-center'}>
                                    <h2>Gallery</h2>
                                    <GridContainer full={true} fluid={true}>
                                        <Grid className={'align-center'} gutters={'margin'}>
                                            {this.state.data.fields.productGalleryImages.map((image, index)=>{
                                                return (
                                                    <Cell className={'img-holder'} small={12} medium={6} large={3}>
                                                        <div ref={this.cellSize}>
                                                            <img onClick={()=>{this.openModal(image.fields.file.url, index)}} src={`${image.fields.file.url}?h=120&w=${Math.round(this.state.size)}&fit=fill`} alt={''}/>
                                                        </div>
                                                    </Cell>
                                                )
                                            })}
                                        </Grid>
                                    </GridContainer>
                                </div>
                            </Cell>
                        </Grid>
                    </GridContainer>
                </div>
            );
        }else{
            return (
                <div>
                    <Header title={'Features & Benefits'}/>
                    <GridContainer full={true} className="wrapper" fluid={true}>
                        <Grid>
                            <Cell small={7}>
                                <ReactMarkdown className={'background product-info'} source={''} />
                            </Cell>
                            <Cell small={5}>
                                <div className={'background product-gallery text-center'}>
                                    <h2>Gallery</h2>
                                    <GridContainer full={true} fluid={true}>
                                        <Grid className={'align-center'} gutters={'margin'}>

                                        </Grid>
                                    </GridContainer>
                                </div>
                            </Cell>
                        </Grid>
                    </GridContainer>
                </div>
            )
        }
    }
}

export default Product
