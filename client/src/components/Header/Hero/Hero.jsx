import React from "react";

const Hero = () => {
    const boldStyle = {  fontWeight: 900 };
    const textSize={
        large: { fontSize: '100px' },
        small: { fontSize: '12px' },
    }
    
  return (
    <div className="hero">
      <p style={{ ...boldStyle, ...textSize.large }}>
        NEXTFUTURE<br></br> CONTENT<br></br> SHOP
      </p>
    </div>
  );
};

export default Hero;