import { Button, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginOptions() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID token

      // Send token to Django
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/firebase-login/",
        {
          method: "POST",
          credentials:"include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      console.log("Django Response:", data); // Debugging

      if (response.ok) {
        // Redirect to Gameverz with user details
        navigate("/gameverz", { state: { user: data } });
      } else {
        alert("Login failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google Login Error:", error.message);
        alert("Login failed: " + error.message);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <img
        src="/Login.svg"
        alt="Landing"
        style={{
          width: "85%",
          height: "100vh",
          objectFit: "contain",
        }}
      />

      <Stack
        spacing={2}
        direction="column"
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Google Login Button */}
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          style={{
            backgroundColor: "#4285F4",
            color: "white",
            padding: "12px 24px",
            fontSize: "15px",
            borderRadius: "12px",
            width: "300px",
          }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>

        {/* Connect Wallet Button */}
        <Button
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          style={{
            backgroundColor: "#01012B",
            color: "white",
            padding: "12px 24px",
            fontSize: "15px",
            borderRadius: "12px",
            width: "300px",
          }}
        >
          Connect Wallet
        </Button>
      </Stack>
    </div>
  );
}

export default LoginOptions;
