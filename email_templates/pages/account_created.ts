export default (props: any) => {
	return `
 
  
<div style="background-color:#5f5f5f;padding:20px">

<div style="display:flex;justify-content:center">
  <table width="100%" style="max-width:900px">
    <tr>
      <td><img src="https://images2.imgbox.com/d4/bf/rTNABwbr_o.jpg" alt="Glow LEDs"
          style="text-align:center;width:100%;border-radius:20px" /></td>
    </tr>
  </table>
</div>
<h4
  style="text-align:center;font-family:helvetica;width:100%;margin:0 margin-top: 10px; auto;line-height:50px;color:white;font-size:2em">
  Welcome ${props.first_name}, to Glow LEDs</h4>
<p style="font-size:16px;line-height:30px;max-width:800px;width:100%;margin:20px auto;color:white">Here at
  Glow-LEDs.com we strive to bring as much light in to as many lives as possible. All items are handmade at my
  home in Austin, TX and all ideas came from my own brain. Our items were dreamt up with the intention of
  turning your home into a glowing rainbow dreamland with infinite hours of entertainment. You don’t need a
  party to enjoy our products (although parties are definitely encouraged). The beautiful colors have the
  ability to turn your home into the next best festival or into a relaxing retreat, you decide.</p>
<div style="display:flex;justify-content:center"><a href="http://www.glow-leds.com/" alt="discount image"
    style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px">
    <h4 style="font-family:helvetica;margin:0;font-size:1.2em;text-align:center">Shop with Glow LEDs Today!</h4>
  </a></div>
</div>
      
    
	`;
};
