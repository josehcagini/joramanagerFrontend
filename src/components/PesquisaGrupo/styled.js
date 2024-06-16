import styled from 'styled-components';

export const Container = styled.div`
    width: 70%;
    height: 60vh;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.1);
    text-align: center;
    padding: 0 30px 30px;
    color: #333;
    visibility: hidden;
    transition: transform 0.4s, top 0.4s;

    visibility: visible;
    top: 50%;
    transform: translate(-50%, -50%) scale(1);
    z-index: 2;
    border: 1px solid #000000;

`;

Container.defaultProps = {
  open: false
}
