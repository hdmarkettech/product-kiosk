import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GridContainer, Grid, Cell} from "react-foundation";
import Header from "../header/header";
const ReactMarkdown = require('react-markdown/with-html')

class ProductCategory extends Component {
    constructor(props) {
        super(props);
        this.cellSize = React.createRef();
        this.state = {
            data: null,
            size: 300
        }
        this.updateSize = this.updateSize.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateSize.bind(this))
        let url = `/api/product-categories?name=${this.props.match.params.category}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({data})
                this.updateSize()
            })
    }
    componentDidUpdate() {
        this.updateSize()
    }

    updateSize(){
        if(this.state.size !== this.cellSize.current.getBoundingClientRect().width){
            this.setState({size: this.cellSize.current.getBoundingClientRect().width})
        }
    }

    render(){
        if(this.state.data){
            return (
                <div>
                    <Header title={this.state.data.fields.name}/>
                    <div className={'background'}>
                        <GridContainer className="wrapper" fluid={true}>
                            <Grid gutters={'padding'} className={'align-center'}>
                                {this.state.data.fields.products ? (this.state.data.fields.products.map((product, index)=>{
                                    if(index <= 2){
                                        return (
                                            <Cell small={3}>
                                                <div ref={this.cellSize}>
                                                    <Link className={'categories'} to={`${this.props.match.url}/${product.fields.name.toLowerCase()}`}>
                                                        <img src={`${product.fields.mainImage.fields.file.url}?w=${Math.round(this.state.size)}&fit=fill`} alt={''}/>
                                                        <h4 dangerouslySetInnerHTML={{__html: product.fields.brandName}}/>
                                                        <ReactMarkdown source={product.fields.description} escapeHtml={false} />
                                                    </Link>
                                                </div>
                                            </Cell>
                                        )
                                    }
                                })): (<p>No Products</p>)}
                            </Grid>
                        </GridContainer>
                        <GridContainer className="wrapper" fluid={true}>
                            <Grid gutters={'padding'} className={'align-center'}>
                                {this.state.data.fields.products ? (this.state.data.fields.products.map((product, index)=>{
                                    if(index > 2){
                                        return (
                                            <Cell small={3}>
                                                <div ref={this.cellSize}>
                                                    <Link className={'categories'} to={`${this.props.match.url}/${product.fields.name.toLowerCase()}`}>
                                                        <img src={`${product.fields.mainImage.fields.file.url}?w=${Math.round(this.state.size)}&fit=fill`} alt={''}/>
                                                        <h4 dangerouslySetInnerHTML={{__html: product.fields.brandName}}/>
                                                        <ReactMarkdown source={product.fields.description} escapeHtml={false} />
                                                    </Link>
                                                </div>
                                            </Cell>
                                        )
                                    }
                                })): (<p>No Products</p>)}
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            );
        } else{
            return (
                <div>
                    <Header title="Loading..."/>
                    <div className={'background'}>
                        <GridContainer className="wrapper" fluid={true}>
                            <Grid gutters={'padding'}>
                                <p>No Products</p>
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            )
        }
    }
}

export default ProductCategory
