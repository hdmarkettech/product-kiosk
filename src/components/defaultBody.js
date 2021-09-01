import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {GridContainer, Grid, Cell} from "react-foundation";
import Header from './header/header'

class DefaultBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        fetch('/api/home')
            .then(response => response.json())
            .then(data => {
                this.setState({data})
            })
    }

    render() {
        if(this.state.data){
            console.log(this.state)
            return (
                <div>
                    <Header title={this.state.data.title}/>
                    <div className={'background'}>
                        <GridContainer full={true}>
                            <Grid gutters={'padding'} className={'paths align-center text-center'}>
                                <Cell small={3}>
                                    <Link to={'/benefits'}>
                                        <img alt={''} src={`${this.state.data.pathOneImage.fields.file.url}?w=444`}/>
                                        <h4>{this.state.data.pathOne}</h4>
                                    </Link>
                                </Cell>
                                <Cell small={3}>
                                    <Link to={'/products'}>
                                        <img alt={''} src={`${this.state.data.pathTwoImage.fields.file.url}?w=444`}/>
                                        <h4>{this.state.data.pathTwo}</h4>
                                    </Link>
                                </Cell>
                                <Cell small={3}>
                                    <Link to={'/photos'}>
                                        <img alt={''} src={`${this.state.data.pathThreeImage.fields.file.url}?w=444`}/>
                                        <h4>{this.state.data.pathThree}</h4>
                                    </Link>
                                </Cell>
                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <Header title="loading..."/>
                    <div className={'background'}>
                        <GridContainer>
                            <Grid gutters={'padding'}>

                            </Grid>
                        </GridContainer>
                    </div>
                </div>
            )
        }
    }
}

export default DefaultBody
