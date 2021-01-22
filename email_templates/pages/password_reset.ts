export default (props: any) => {
	return `
 
  <div style="background-color:#5f5f5f;padding:20px">
        <div style="display:flex;justify-content:center"></div>
        <h4 style="text-align:center;font-family:helvetica;color:white;font-size:1.5em;margin-top:20px;margin-bottom:0">
          Hi ${props.data.first_name}</h4>
        <p
          style="font-size:16px;line-height:30px;max-width:800px;width:100%;text-align:center;margin:20px auto;color:white">
          Your Password Was Successfully Changed. If you didn’t request this, please contact Glow LEDs using the link
          below.</p>
        <div style="display:flex;justify-content:center"><a href="https://www.glow-leds.com/pages/contact"
            alt="discount image" style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px">
            <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center">Contact</h4>
          </a></div>
      </div>
      
    
	`;
};
