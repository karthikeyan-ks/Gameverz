
import { useNavigate } from 'react-router-dom'; 
function GameverzLanding() {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundColor: "black", 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      position: "relative"  
    }}>
      {/* Centered Button */}
      <button 
      onClick={() => navigate("/login")}
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "15px 30px",
          fontSize: "18px",
          color: "white",
          backgroundColor: "#01012B",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer"
        }}
      >
        Join
      </button>

      {/* SVG Image */}
      <img 
        src="landing1.svg" 
        alt="Landing"
        style={{
          width: "85%", 
          height: "100vh",
          objectFit: "contain"
        }} 
      />
    </div>
  );
}

export default GameverzLanding;
