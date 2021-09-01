import React, {Component} from 'react'
import './paths.scss'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GridContainer, Grid, Cell} from "react-foundation";
import Header from "../header/header";

class Paths extends Component {
    constructor(props, context) {
        super(props);
        this.cellSize = React.createRef();
        this.cellSize2 = React.createRef();
        this.state = {
            data: null,
            size: 400,
            size2: 300
        }
        this.updateSize = this.updateSize.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateSize.bind(this))
        let url = `/api/paths?name=${window.location.pathname}`;
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
        if(this.cellSize2.current && this.state.size2 !== this.cellSize2.current.getBoundingClientRect().width){
            this.setState({size2: this.cellSize2.current.getBoundingClientRect().width})
        }
    }

    render(){
        if(this.state.data){
            return (
                <div className={this.props.location.pathname === '/products' ? 'products' : ''}>
                    <Header title={this.state.data.fields.title} back={'/'} />
                    <div className={'background'}>
                        <GridContainer className="wrapper" fluid={true}>
                            <Grid gutters={'padding'} className={'align-center'}>
                                {this.state.data.fields.items.map((item, itemIndex)=>{
                                    if(this.state.data.fields.items.length >= 9 && itemIndex > 3){
                                        return (
                                            <Cell className={'categories'} small={2}>
                                                <div ref={this.cellSize2}>
                                                    <Link className={'items'} to={{pathname: `${this.props.match.url}/${item.fields.uri}`, state: {benefits: this.state.data.fields.items}}}>
                                                        <img src={`${item.fields.mainImage.fields.file.url}?w=${Math.round(this.state.size)}`} alt={''}/>
                                                        <h4>{item.fields.name}</h4>
                                                    </Link>
                                                </div>
                                            </Cell>
                                        )
                                    }else{
                                        return (
                                            <Cell className={'categories'} small={3}>
                                                <div ref={this.cellSize}>
                                                    <Link className={'items'} to={{pathname: `${this.props.match.url}/${item.fields.uri}`, state: {benefits: this.state.data.fields.items}}}>
                                                        <img src={`${item.fields.mainImage.fields.file.url}?w=${Math.round(this.state.size)}`} alt={''}/>
                                                        <h4>{item.fields.name}</h4>
                                                    </Link>
                                                </div>
                                            </Cell>
                                        )
                                    }
                                })}
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
                                <Cell small={3}>

                                </Cell>
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            )
        }
    }
}

export default Paths
