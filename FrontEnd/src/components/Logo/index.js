import React from 'react';

function Logo(props) {
  return (
    <img
      width="200px"
      alt="Logo"
      src="https://static.sitemercado.com.br/assets/img/logos/sitemercado.png"
      {...props}
    />
  );
}

export default Logo;
