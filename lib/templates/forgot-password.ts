export const forgotPasswordTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <link
      href="https://api.fontshare.com/v2/css?f[]=poppins@500,400,200,600&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Poppins", Courier, monospace;
      }
    </style>
  </head>
  <body style="max-width: 60%; margin: 0 auto">
    <h3 style="font-size: 17px;">Jobber</h3>
    <p>Hi <span style="font-weight: bold">{{name}}, </span></p>
    <p> 
      Reset Password Link
    </p>
    <p>Your can reset your password here <a href="{{url}}"> {{linkName}}</a></p>
    <p>This link will expire in 15 minutes</p>
    <div
      style="
        border-bottom: 1px grey solid;
        padding-bottom: 15px;
        padding-bottom: 15px;
      "
    >
      <p style="font-size: 15px; font-weight: medium">Thank you</p>
      <p style="font-size: 15px; font-weight: medium">Team Jobber</p>
    </div>

  </body>
</html>


`;
