import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
function Contact() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <div id='contact' className=''>
            <h1>CONTACT US</h1>
        <Stack direction="row" spacing={2}>
          <Item><div className='box'>
              <form>
                  <input type="text" placeholder='Name' required />
                  <input type="email" placeholder='Your Email' required />
                  <textarea  placeholder='Write Your Message ....'  required></textarea>
                  <input type="submit" value='Send'/>
              </form>
            </div>
          </Item>
          <Item>
            <div className=''>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1604.6691316647943!2d10.7244028!3d36.4493808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130299a2da4fe895%3A0x81375888b980e5d8!2sIMSET%20NABEUL!5e0!3m2!1sfr!2stn!4v1685543130005!5m2!1sfr!2stn"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </Item>

        </Stack>
    </div>
  )
}

export default Contact