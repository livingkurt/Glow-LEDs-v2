export default (props: any) => {
	return `
  <body style="padding:0;margin:0">
  <div>
  <div style="font-family:helvetica;margin:0px;padding:0px;width:100%;border-radius:20px">
    <div style="background-color:#333333;padding:20px">
      <div style="display:flex;justify-content:center">
        <table width="100%" style="max-width:500px">
          <tr>
            <td><img src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png" alt="Glow LEDs"
                style="text-align:center;width:100%;margin-right:20px" /></td>
          </tr>
        </table>
      </div>
      <h4
      style="text-align:center;font-family:helvetica;width:100%;margin:0 auto;line-height:50px;color:white;font-size:2em">
      ${props.title}</h4>
  </div>
  ${props.body}
  <div style="background-color:#333333;padding:20px">
        <div
          style="margin-left:10px;display:flex;justify-content:space-between;max-width:250px;width:100%;margin:0 auto;color:white">
          <div style="font-size:30px;color:white"><a rel="noopener noreferrer"
              href="https://www.facebook.com/Glow-LEDscom-100365571740684" target="_blank"><i
                class="fab fa-facebook zoom" style="color:white"></i></a></div>
          <div style="font-size:30px;color:white"><a rel="noopener noreferrer"
              href="https://www.instagram.com/glow_leds/" target="_blank"><i class="fab fa-instagram zoom"
                style="color:white"></i></a></div>
          <div style="font-size:30px;color:white"><a rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw" target="_blank"><i
                class="fab fa-youtube zoom" style="color:white"></i></a></div>
          <div style="font-size:30px;color:white"><a rel="noopener noreferrer" href="https://soundcloud.com/ntre/tracks"
              target="_blank"><i class="fab fa-soundcloud" style="color:white"></i></a></div>
        </div>
        <div style="border-bottom:1px white solid;max-width:600px;width:100%;margin:15px auto"></div>
        <p style="text-align:center;font-size:14px;color:white">Our mailing address is: <br />404 Kenniston Dr Apt D,
          Austin, TX 78752 </p>
        <p style="text-align:center;font-size:14px;color:white">Want to change how you receive these emails? <br /> You
          can <a rel="noopener noreferrer"
            href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile" target="_blank"
            style="text-decoration:underline;color:white">update your preferences</a> or <a rel="noopener noreferrer"
            href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile" target="_blank"
            style="text-decoration:underline;color:white">unsubscribe </a>from this list.</p>
  </div>
  </div>
</div>
</body>
	`;
};
