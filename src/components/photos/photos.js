import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GridContainer, Grid, Cell, Thumbnail} from "react-foundation";
import Header from "../header/header";
import './photos.scss'
import Modal from 'react-modal';
import Swiper from 'react-id-swiper'
import closeButton from '../../assets/close-icon-white.svg'

const customStyles = {
    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    content : {
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
const params = {
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
function getParent2() {
    return document.querySelector('#root');
}

class Photos extends Component{
    constructor(props) {
        super(props);
        this.cellSize = React.createRef();
        this.state = {
            data: null,
            modalIsOpen: false,
            size: 400,
            imgSize: 300
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateSize = this.updateSize.bind(this)
    }
    openModal(image, index) {
        this.setState({modalIsOpen: true, imageURL: image});
        let background = document.querySelector('.background')
        background.style.position = 'fixed';
        params.initialSlide = index
    }
    closeModal() {
        this.setState({modalIsOpen: false});
        let background = document.querySelector('.background')
        background.style.position = 'static';
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateSize.bind(this))
        let url = `/api${window.location.pathname}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({data})
                this.updateSize()
            })
    }
    updateSize(){
        if(this.state.size !== window.innerHeight){
            this.setState({size: Math.round(window.innerHeight * .9)})
        }
        if(this.state.imgSize !== this.cellSize.current.getBoundingClientRect().width){
            this.setState({imgSize: this.cellSize.current.getBoundingClientRect().width})
        }
        console.log('window.innerHeight', window.innerHeight)
    }
    render() {
        if(this.state.data){
            return(
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Photos Page Modal"
                        parentSelector={getParent2}
                    >
                        <GridContainer fluid={true}>
                            <Grid>
                                <Cell small={12}>
                                    <button onClick={this.closeModal}><img src={closeButton}/></button>
                                    <Swiper {...params}>
                                        {this.state.data.fields.images.map((image)=>{
                                            return (
                                                <div  className={'imageHolder'}>
                                                    <img src={`${image.fields.file.url}?h=${this.state.size}`} alt={''}/>
                                                </div>
                                            )
                                        })}
                                    </Swiper>
                                </Cell>
                            </Grid>
                        </GridContainer>
                    </Modal>
                    <Header title={this.state.data.fields.name}/>
                    <div className={'background'}>
                        <GridContainer className="photos" fluid={true}>
                            <Grid gutters={'padding'} className={'align-center'}>
                                {this.state.data.fields.images.map((image, index)=>{
                                    return (
                                        <Cell small={2}>
                                            <div ref={this.cellSize}>
                                                <img onClick={()=>{this.openModal(image.fields.file.url, index)}} src={`${image.fields.file.url}?h=300&w=${Math.round(this.state.imgSize)}&fit=fill`} alt={''}/>
                                            </div>
                                        </Cell>
                                    )
                                })}
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <Header title="Photos"/>
                    <div className={'background'}>
                        <GridContainer className="photos" fluid={true}>
                            <Grid gutters={'padding'}>

                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            )
        }
    }
}

export default Photos
