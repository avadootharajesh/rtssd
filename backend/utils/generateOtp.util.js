const generateOtp = () => {
    try {
        let otp = Math.floor(1000 + Math.random() * 9000);
        while (otp.toString().length < 7) {
            otp = Math.floor(1000 + Math.random() * 9000);
        }
        console.log(otp, "Generated from generateOtp");
        return otp
    } catch(error) {
        console.log(error);
        throw new Error("Failed to generate OTP");
    }
}

module.exports = { generateOtp }