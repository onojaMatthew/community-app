// const ejs = require( 'ejs' );
const nodeMailer = require( 'nodemailer' );
const winston = require("winston");
// const log = require( 'utils' ).logger().getLogger( process.env.APP_NAME );
const fs = require( 'fs' );
// const path = require( 'path' );
const { APP_NAME , NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
// const inlineCss = require( 'inline-css' );
const { emailTemplate } = require("./template");

exports.sendMail = async (email, message, subject, fromWho) => {
  dev ? await exports.mailerTester( email, message, subject, fromWho ) : 
  await exports.mailer( emails, message, subject, fromWho );
}

exports.mailer = async (email, message, subject, fromWho) => {
  const testAccount = await nodeMailer.createTestAccount();
  console.log(testAccount.pass, testAccount.user);
  let transporter = await nodeMailer.createTransport( {
    host : "onojamatthewsv@gmail.com",
    port : 465 ,
    secure : true , // true for 465, false for other ports
    service: "Gmail",
    auth : {
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASSWORD
    } ,
    tls : { rejectUnauthorized : false },
  } );

  const mailOptions = {
    from : fromWho ? fromWho : '"Ojirehprime Connect Verify Account" <info@ojirehprime.com>' , // sender address
    // bcc : fromWho ? "info@greenconnect.ng" : emails , // list of receivers
    to : fromWho ? "info@greenconnect.ng" : email , // list of receivers
    subject : subject , // Subject line
    html : emailTemplate(message, subject, fromWho) // html body
  } 
  // send mail with defined transport object
  await transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      return response.send(error);
    } 
      return response.send("Email sent");
  });
  // winston.info( info );
  return "Done";
}

exports.mailerTester = async ( message, subject, fromWho ) => {
  // Generate test SMTP service account fromWho ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodeMailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport( {
    host : "smtp.ethereal.email",
    port : 587,
    secure : false, // true for 465, false for other ports
    auth : {
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASSWORD
    }
  } );

  // send mail with defined transport object
  let info = await transporter.sendMail( {
    from : fromWho , // sender address
    to : fromWho ? "info@ojirehprime.com" : fromWho , // list of receivers
    subject : subject , // Subject line
    html : message // html body
  } );
  
  winston.info( "Message sent: %s" , info.messageId );
  winston.info( "Preview URL: %s" , nodeMailer.getTestMessageUrl( info ) );
}

// exports.getTemplate = async( template, data = {}, opts ) => {
//   const selection = {
//     activation : fs.readFileSync( path.join( process.cwd(), '/src/tools/emailTemplate/activation.ejs' ) ).toString()
//   };
//   const acceptedType = [ "activation", "transaction", "notification", "forgotPassword", "support" ];
//   if ( !acceptedType.includes( template ) ) throw new Error( `Unknown email template type expected one of ${ acceptedType } but got ${ template }` );
//   const html = ejs.compile( selection[ template ] , opts || {} )( data );
//   return await inlineCss( html , {
//     applyStyleTags : false ,
//     applyTableAttributes : true,
//     removeHtmlSelectors : true,
//     url : 'https://ojirehprime.ng'
//   } )
// }