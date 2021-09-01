import React, {Component} from 'react'
import {Grid, Cell} from "react-foundation";
import {Link} from "react-router-dom"
import logo from '../../assets/hd-logo.svg'
import backBtn from '../../assets/back-btn.svg'
import './headers.scss'
import { withRouter } from 'react-router'

let goBackButton;
class Header extends Component{
    constructor(props){
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount(){
        if(typeof this.props.back === 'string'){
            goBackButton = (<Link className="back-btn" to={this.props.back}><img className={'back-btn'} src={backBtn} alt=""/></Link>)
        }else if (this.props.location.pathname === "/"){
            goBackButton = ""
        } else{
            goBackButton = <a className="back-btn" onClick={this.goBack}><img className={'back-btn'} src={backBtn} alt=""/></a>
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(typeof this.props.back === 'string'){
            goBackButton = (<Link className="back-btn" to={this.props.back}><img className={'back-btn'} src={backBtn} alt=""/></Link>)
        }else if (this.props.location.pathname === "/"){
            goBackButton = ""
        } else{
            goBackButton = <a className="back-btn" onClick={this.goBack}><img className={'back-btn'} src={backBtn} alt=""/></a>
        }
    }

    goBack(){
        this.props.history.goBack()
    }
    render() {
        return (
            <header>
                <Grid gutters={'padding'}>
                    <Cell small={12}>
                        <Link to={'/'}>
                            <img className="logo" src={logo} alt="Hunter Douglas"/>
                        </Link>
                    </Cell>
                </Grid>
                <Grid gutters={'padding'}>
                    <Cell small={2}>{goBackButton}</Cell>
                    <Cell small={8}>
                        <h1 className="page-title text-center">{this.props.title}</h1>
                    </Cell>
                </Grid>
            </header>
        );
    }
}

export default withRouter(Header);
