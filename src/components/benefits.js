import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import {GridContainer, Grid, Cell} from "react-foundation";
import Header from "./header/header";
import Swiper from "react-id-swiper"
import './benefits.scss'
const ReactMarkdown = require('react-markdown/with-html');


const params = {
    navigation: {
        nextEl: '.swiper-button-next.swiper-button-orange',
        prevEl: '.swiper-button-prev.swiper-button-orange'
    },
    spaceBetween: 0,
}

class Benefits extends Component {
    constructor(props, context) {
        super(props);
        this.cellSize = React.createRef();
        this.state = {
            data: null,
            index: -1,
            size: 600
        }
        this.swiper= null;
        this.updateSwiper = this.updateSwiper.bind(this)
        this.updateSize = this.updateSize.bind(this)
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.updateSize.bind(this))
        console.log('this.props.match.params.benefit', this.props.match.params.benefit)
        let url = `/api/benefits?name=${this.props.match.params.benefit}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({data})
                this.updateSize()
            })
        this.props.location.state.benefits.forEach((benefit,index)=>{
            if(benefit.fields.uri === this.props.match.params.benefit){
                params.initialSlide = index;
            }
        })

    }
    updateSize(){
        if(this.state.size !== this.cellSize.current.getBoundingClientRect().width){
            this.setState({size: this.cellSize.current.getBoundingClientRect().width})
        }
    }
    updateSwiper = (swiper)=>{
        if(swiper !== null){
            this.swiper = swiper;
            this.setState({index: swiper.activeIndex})
            swiper.on('slideChange', ()=>{
                this.setState({index: swiper.activeIndex})
                this.props.history.push(`/benefits/${this.props.location.state.benefits[swiper.activeIndex].fields.uri}`, {benefits: this.props.location.state.benefits})
                console.log('this.props', this.props)
            })
        }
    }
    render() {
        if(this.state.data){
            console.log('this.props.location', this.props)
            return (
                <div>
                    <Header title={this.state.data.fields.name} back={'/benefits'}/>
                    <div className={'benefit-background background'}>
                        <GridContainer fluid={true} className={'benefit-nav'}>
                            <Grid className={'align-center'}>
                                <Cell small={12} large={12}>
                                    <Grid>
                                        {this.props.location.state.benefits.map((benefit, index)=>{
                                            return(
                                                <Cell key={index} className={'seven'}>
                                                    <Link exact="true" className={'text-center benefit-list ' + (this.state.index === index ? 'active' : '')} to={{pathname: `/benefits/${benefit.fields.uri}`, state: {benefits: this.props.location.state.benefits}}}>{benefit.fields.name}</Link>
                                                </Cell>
                                            )
                                        })}
                                    </Grid>
                                </Cell>
                            </Grid>
                        </GridContainer>
                        <GridContainer className="wrapper" fluid={true}>
                            <Swiper {...params} getSwiper={this.updateSwiper}>
                                {this.props.location.state.benefits.map((benefit,index)=>{
                                    return (
                                        <Grid className={'align-center'}>
                                            <Cell small={12} large={10}>
                                                <Grid>
                                                    <Cell small={7}>
                                                        <div className={'benefit text-bg'}>
                                                            <h3>{benefit.fields.name}</h3>
                                                            <ReactMarkdown source={benefit.fields.description} escapeHtml={false}/>
                                                        </div>
                                                    </Cell>
                                                    <Cell small={5}>
                                                        <div ref={this.cellSize} className={'benefit image-bg'}>
                                                            <img className={'showcaseImg'} src={`${benefit.fields.showcaseImage.fields.file.url}?w=${Math.round(this.state.size)}`}/>
                                                            <div className={'showcaseDescription'}>
                                                                <ReactMarkdown className={'product-name'} source={benefit.fields.showcaseProduct} escapeHtml={false}/>
                                                                <p className={'product-description'}>{benefit.fields.showcaseProductDescription}</p>
                                                                <a href={benefit.fields.showcaseProductLink} className={'button'}>Learn More</a>
                                                            </div>
                                                        </div>
                                                    </Cell>
                                                </Grid>
                                            </Cell>
                                        </Grid>
                                    )
                                })}
                            </Swiper>
                        </GridContainer>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <Header title="Loading..."/>
                    <div className={'benefit-background background'}>
                        <GridContainer fluid={true} className={'benefit-nav'}>
                            <Grid className={'align-center'}>
                                <Cell small={12} large={6}>
                                    <Grid>

                                    </Grid>
                                </Cell>
                            </Grid>
                        </GridContainer>
                        <GridContainer className="wrapper" fluid={false}>

                        </GridContainer>
                    </div>
                </div>
            )
        }
    }
}

export default Benefits
