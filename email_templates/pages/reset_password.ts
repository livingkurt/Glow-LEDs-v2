export default (props: any) => {
	return `
 
  <div style="background-color:#5f5f5f;padding:20px">
  <div style="display:flex;justify-content:center"></div>
  <h4 style="text-align:center;font-family:helvetica;color:white;font-size:1.5em;margin-top:20px;margin-bottom:0">
    Someone has requested a link to change your password.</h4>
  <p style="font-size:16px;line-height:30px;max-width:800px;width:100%;margin:20px auto;color:white">Click the
    Link Below to Continue the Password Change Process. 'If you didn’t request this, please ignore this email. Your password won’t change until you access the
    link below and create a new one.</p>
  <div style="display:flex;justify-content:center"><a href="${process.env.NODE_ENV === 'production'
		? 'http://www.glow-leds.com'
		: 'http://localhost:3000'}/account/resetpassword/${props._id}" alt="discount image"
      style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px">
      <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center">Change your Password</h4>
    </a></div>
</div>
      
    
	`;
};
