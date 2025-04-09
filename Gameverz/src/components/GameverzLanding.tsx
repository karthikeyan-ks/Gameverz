
import { Box } from '@mui/material';
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
      <Box
        sx={
          {
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "15px 30px",
            fontSize: "18px",
            color: "white",
            border: "none",
            borderRadius: "15px",
            display:"flex",
            flexDirection:"row",
            gap:"10px",
            cursor: "pointer"
          }
        }
      >
        <button
        style={{
          margin:"10px",
          backgroundColor: "#01012B",
          padding:"10px",
          borderRadius:"10px"
        }}
          onClick={() => navigate("/login")}
        >
          Join
        </button>
        <button
         style={{
          backgroundColor: "#01012B",
          margin:"10px",
          padding:"10px",
          borderRadius:"10px"
        }}
          onClick={() => navigate("/login",{state:"gameAdmin"})}
        >
          Become a Game Owner
        </button>

      </Box>



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
