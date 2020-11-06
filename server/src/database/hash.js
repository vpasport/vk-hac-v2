"use strict";

const { randomBytes, createHash } = require( "crypto" );

module.exports = ( data, { salt, saltGenerator, saltLength, algorithm } ) => {
  if( typeof salt !== "string" || salt === "" ){
    if( typeof saltGenerator === "function" )
      salt = saltGenerator();
    else{
      if( !Number.isInteger( saltLength ) || saltLength < 1 ) throw "Salt length must be setted";

      salt = randomBytes( saltLength ).toString( "hex" );
    }
  }

  if( typeof algorithm !== "string" || algorithm === "" ) throw "Algorithm must be setted";

  const hash = createHash( algorithm ).update( `${data}${salt}` ).digest( "hex" );

  return { hash, salt, hashAndSalt: `${hash};${salt}` };
};
