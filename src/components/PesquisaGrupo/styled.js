import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 60vh;
    background: #fff;
    position: absolute;
    left: 50%;
    color: #333;
    transition: transform 0.4s, top 0.4s;
    border-radius: 5px;
    box-shadow: 0 0 5px #fff;
    ${(props) => {
      if(props.open){
          return ('visibility: visible; ' +
          'top: 50%; ' +
          'transform: translate(-50%, -50%) scale(1); ' +
          'z-index: 2; ' +
          'border: 1px solid #000000; ')
        } else {
          return ('visibility: hidden; ' +
          'transform: translate(-50%, -50%) scale(0.1); ' +
          'top: 0; ' +
          'border-radius: 6px; ')
        }
      }
    }
`;

Container.defaultProps = {
  open: false
}

export const DivBottom = styled.div`
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DivUpper = styled.div`
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DivMiddle = styled.div`
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`
