import React, { Component } from 'react'

import styled from 'styled-components';

/*
    Footer on Home Page
*/


const Container = styled.div`
    min-height: 20vh;
    padding: 60px 60px;
    background: radial-gradient(white);
    justify-content: center;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    font-size: small;
    background-color: rgb(245, 240, 227);
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 60px;
    justify-content: center;
    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
        grid-gap: 20px;
    }
`

const Column = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    max-width: 200px;
    margin: 0 auto;
    
`

const Title = styled.p`
    color: rgb(7, 67, 7);
    max-width: 200px;
    text-align: center;
    font-size: 30px;
`

const Link = styled.a`
    color: black;
    margin-bottom: 20px;
    font-size: 25px;
    text-decoration: none;
    max-width: 200px;
    &:hover {
        color: rgb(7, 67, 7);
        transition: 200ms ease-in;
        text-decoration: none;
    }
`

const Icon = styled.i`
    margin-right: 12px;
    font-size: 18px;
`



export default class Footer extends Component {
    render() {
        return (
            <Container id='container'>
                <Wrapper>
                    <Row>
                        <Column>
                            <Title>Contact</Title>
                            <Link href="#">E-mail</Link>
                            <Link href="#">Phone</Link>
                            <Link href="#">Address <br /> </Link>
                            <Link></Link>
                        </Column>
                        <Column>
                            <Title href="#">Services</Title>
                            <Link href="#">Buy TextBook</Link>
                            <Link href="#">Sell TextBook</Link>

                        </Column>
                        <Column>
                            <Title>Social</Title>
                            <Link href="#">Facebook</Link>
                            <Link href="#">Instagram</Link>
                            <Link></Link>
                            <Link></Link>
                        </Column>
                    </Row>
                </Wrapper>
            </Container>
        )
    }
}