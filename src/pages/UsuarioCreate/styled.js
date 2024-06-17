import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FundoPreto = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    color: #000000;
    z-index: 1;
    ${(props) => {
      if(props.open){
        return ('backdrop-filter: blur(1px); ' +
        'visibility: visible; ' +
        'background: #00000050;')
      }else{
        return ('visibility: hidden; ' +
        'background: #000000;')
      }
    }}
`

FundoPreto.defaultProps={
  open: false
}
