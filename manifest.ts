
import * as coda from '@codahq/packs-sdk';
export const pack = coda.newPack();

const fontfamily = `helvetica, 'helvetica neue', arial, verdana, sans-serif`
const fontfamilytitles = `arial, 'helvetica neue', helvetica, sans-serif`
const msotablestyle = `mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px`

pack.addFormula({
  name: 'ContentBlock',
  description: 'Generates HTML block code for content block types "h1", "h2", "title", "subtitle", "paragraph", "image", "avatar", "logo", "button", "spacer", "divider, or "wrapper".',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'contentType',
      description: 'The type of content you want to add. Options are "h1", "h2", "title", "subtitle", "paragraph", "image", "avatar", "logo", "button", "spacer", "divider, or "wrapper".'
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'content',
      description: 'Title, Content, Alt Text for images, or Button text'
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'link',
      description: 'The URL of the image itself or the destination URL for a button.',
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'alignment',
      description: 'Align content "left" or "center".',
      optional: true
    }),
  ],

  execute: async function ([contentType, content, link, alignment]) {
    let body = '';
    let presentation = '';
    switch (contentType.toLowerCase()) {
      case 'h1':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <h3 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:${fontfamilytitles};font-size:32px;font-style:normal;font-weight:normal;color:#282F33;margin-bottom:7px">
                         ${content}
                        </h3>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'h2':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <h3 style="Margin:0;line-height:28px;mso-line-height-rule:exactly;font-family:${fontfamilytitles};font-size:24px;font-style:normal;font-weight:normal;color:#282F33;margin-bottom:7px">
                         ${content}
                        </h3>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'title':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:${fontfamilytitles};font-size:18px;font-style:normal;font-weight:normal;color:#282F33;margin-bottom:7px">
                         <b>${content}</b>
                        </h3>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'subtitle':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <p style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:${fontfamilytitles};font-size:14px;font-style:normal;font-weight:normal;letter-spacing: 0.5px;color:#525252;margin-bottom:6px">
                         ${content.toUpperCase()}
                        </p>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'paragraph':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:${fontfamily};line-height:24px;color:#525252;font-size:16px;margin-bottom:6px">
                          ${content}
                        </p>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'image':
        body = `<td align="${alignment || 'center'}" style="Margin:0;padding-top:15px;padding-bottom:15px;font-size:0px">
                        <img class="adapt-img" src="${link}" alt="${content}" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="530px">
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'avatar':
        body = `<td align="${alignment || 'center'}" style="Margin:0;padding-top:15px;padding-bottom:15px;font-size:0px">
                        <img src="${link}" alt="${content}" style="display:block;border:3px solid #ffffff;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border-radius:50%;" width="128px">
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'logo':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding-top:15px;padding-bottom:15px;font-size:0px">
                        <img src="${link}" alt="${content}" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="68px" />
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'button':
        body = `<td align="${alignment || 'left'}" style="Margin:0;padding:0px;">
                        <span class="es-button-border" style="border-style:solid;border-color:#282F33;background:#000000;border-width:1px;display:inline-block;border-radius:3px;width:auto">
                          <a href="${link}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;border-style:solid;border-color:#000000;border-width:12px 35px 12px 35px;display:inline-block;background:#000000;border-radius:3px;font-family:${fontfamily};font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center">
                            ${content}
                          </a>
                        </span>
                       </td>`;
        presentation = `role="presentation"`;
        break;
      case 'spacer':
        body = `<td align="${alignment || 'center'}" style="Margin:0;padding-top:15px;padding-bottom:15px;font-size:0px">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="${msotablestyle}">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:0px solid #ffffff;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table>
                      </td>`;
        break;
      case 'divider':
        body = `<td align="${alignment || 'center'}" style="Margin:0;padding-top:25px;padding-bottom:40px;font-size:0px">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="${msotablestyle}">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #dddddd;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table>
                      </td>`;
        break;
      case 'wrapper':
        body = `${content}`;
        break;
      default:
        console.log(`Unexpected contentType: ${contentType}`);
        return 'Please enter a valid content type';
    }
    return `             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table width="100%" cellspacing="0" cellpadding="0" style="${msotablestyle}">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" ${presentation} style="${msotablestyle}">
                     <tr>
                      ${body}
                     </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>`;
  },
  resultType: coda.ValueType.String
});

pack.addFormula({
  name: 'BulletedList',
  description: 'Creates a bulleted list of text or text links',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'items',
      description: 'A list of the URLs for every avatar',
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'itemlinks',
      description: 'A list of the names of each person',
      optional: true
    }),
  ],
  execute: async function ([items,itemlinks]) {
    let result = '';
    for(let i = 0; i < items.length; i++) { 
      if (!itemlinks || !itemlinks[i]) {
        result += `                        <li style="margin-bottom:6px;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:${fontfamily};line-height:24px;color:#525252;font-size:16px">
                          ${items[i]}
                        </li>
`;
      }
      else {
        result += `                        <li style="margin-bottom:6px;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:${fontfamily};line-height:24px;color:#525252;font-size:16px">
                          <a target="_blank" href="${itemlinks[i]}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#1251BA;font-size:16px">
                            ${items[i]}
                          </a>
                        </li>
`;
      }
    }
    return `             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table width="100%" cellspacing="0" cellpadding="0" style="${msotablestyle}">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="${msotablestyle}">
                     <tr>
                      <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:0px;padding-right:8px;font-size:0px">
                        <ul style="padding-left:10px;">
${result}                      </ul>
                      </td>                    
                    </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>`;
  },
  resultType: coda.ValueType.String,
});

pack.addFormula({
  name: 'FacePile',
  description: 'Creates a horizontal list of overlapping avatars',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'avatarlist',
      description: 'A list of the URLs for every avatar',
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'namelist',
      description: 'A list of the names of each person',
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'alignment',
      description: 'Align content "left" or "center".',
      optional: true
    }),
  ],
  execute: async function ([avatarlist,namelist,alignment]) {
    let result = '';
    for(let i = 0; i < avatarlist.length; i++) { 
      result += `                        <span style="display:inline-block; max-width:30px; font-size:16px;">
                          <img src="${avatarlist[i]}" alt="${namelist[i]}" style="display:inline-block;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border:2px solid #ffffff;background-color:#f9f9f9;border-radius:50%;" width="36px">
                        </span>
`;
    }
    return `             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table width="100%" cellspacing="0" cellpadding="0" style="${msotablestyle}">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="${msotablestyle}">
                     <tr>
                      <td align="${alignment || 'center'}" style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:0px;padding-right:8px;font-size:0px">
${result}                      </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>`;
  },
  resultType: coda.ValueType.String,
});

pack.addFormula({
  name: 'Table',
  description: 'Creates a styled table for your email.',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'labels',
      description: 'A list of column labels.',
    }),
    coda.makeParameter({
      type: coda.ParameterType.StringArray,
      name: 'data',
      description: 'The data in the form of a list of lists with column values divided by a "|" character.',
    }),
  ],
  execute: async function ([labels,data]) {
    let labelsrow = '';
    let datarowstack = '';
    for(let i = 0; i < labels.length; i++) { 
        labelsrow += `                        <th>
                          ${labels[i]}
                        </th>
`;
    }
    for(let i = 0; i < data.length; i++) { 
      let datarows = '';
      let columns = data[i].split("|")
      for(let j = 0; j < columns.length; j++) { 
        datarows += `                        <td style="padding:6px;Margin:0;">
                          ${columns[j]}
                        </td>
`;
      }
      datarowstack += `                    <tr style="border-collapse:collapse;border-bottom:1px solid #DDDDDD;background:#FFFFFF;">
${datarows}                    </tr>
`;
    }
    return `             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table width="100%" cellspacing="0" cellpadding="0" style="${msotablestyle}">
                 <tr>
                  <td valign="top" align="center" style="padding-top:15px;padding-bottom:15px;Margin:0;width:530px;">
                    <table width="100%" style="${msotablestyle};font-size:14px;font-family:${fontfamily};background-color:#EEEEEE;border-radius:7px 7px 0px 0px;" cellpadding="6">
                      <tr>
${labelsrow}                    </tr>
${datarowstack}                  </table>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
`;
  },
  resultType: coda.ValueType.String,
});

pack.addFormula({
  name: 'EmailCode',
  description: 'Code generator for a HTML email.',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'subject',
      description: 'The subject of your email.'
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'content',
      description: 'The main body of the email, a formula that pulls from the template table.'
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'footertext',
      description: 'Small copyright or footer message text.',
    }),
  ],

  execute: async function ([subject, content, footertext]) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:${fontfamily}">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>${subject}</title>
  <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
  <!--[if gte mso 9]>
    <style>sup { font-size: 100% !important; }</style>
  <![endif]-->
  <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    #outlook a {
      padding:0;
    }
    .es-button {
      mso-style-priority:100!important;
      text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
      color:inherit!important;
      text-decoration:none!important;
      font-size:inherit!important;
      font-family:inherit!important;
      font-weight:inherit!important;
      line-height:inherit!important;
    }
    .es-desk-hidden {
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
      mso-hide:all;
    }
    [data-ogsb] .es-button {
      border-width:0!important;
      padding:12px 35px 12px 35px!important;
    }
    @media only screen and (max-width:600px) {
      p, ul li, ol li, a { line-height:150%!important }
      h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% }
      h1 { font-size:30px!important; text-align:left; margin-bottom:18px }
      h2 { font-size:26px!important; text-align:left; margin-bottom:16px }
      h3 { font-size:20px!important; text-align:left; margin-bottom:12px }
      .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important }
      .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important }
      .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } 
      .es-menu td a { font-size:16px!important } 
      .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important }
      .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important }
      .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } 
      .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important }
      .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important }
      .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important }
      .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important }
      .es-adaptive table, .es-left, .es-right { width:100%!important }
      .es-content table, .es-footer table, .es-content, .es-footer { width:100%!important; max-width:600px!important }
      .es-adapt-td { display:block!important; width:100%!important }
      .adapt-img { width:100%!important; height:auto!important }
      .es-m-p0 { padding:0px!important }
      .es-m-p0r { padding-right:0px!important }
      .es-m-p0l { padding-left:0px!important }
      .es-m-p0t { padding-top:0px!important }
      .es-m-p0b { padding-bottom:0!important }
      .es-m-p20b { padding-bottom:20px!important }
      tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important }
      tr.es-desk-hidden { display:table-row!important }
      table.es-desk-hidden { display:table!important }
      td.es-desk-menu-hidden { display:table-cell!important }
      .es-menu td { width:1%!important }
      table.es-table-not-adapt, .esd-block-html table { width:auto!important }
      table.es-social { display:inline-block!important }
      table.es-social td { display:inline-block!important }
      p, ul li, ol li { margin-bottom:11px!important }
      .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li { margin-bottom:12px!important }
      .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li { margin-bottom:9px!important }
    }
  </style>
 </head>
 <body style="width:100%;font-family:${fontfamily};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#F9F9F9;padding:20px;">
   <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#f9f9f9" origin="0.5, 0" position="0.5, 0"></v:fill>
      </v:background>
    <![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="${msotablestyle};padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F9F9F9">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="${msotablestyle};table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="${msotablestyle};background-color:#FFFFFF;width:590px;border:1px solid #dddddd;">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="${msotablestyle}">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="${msotablestyle}">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="${msotablestyle}">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:0px solid #ffffff;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table>
                      </td>
                     </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>
             ${content}
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="${msotablestyle}">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="${msotablestyle}">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" style="${msotablestyle}">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:0px solid #ffffff;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table>
                      </td>
                     </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>
           </table>
          </td>
         </tr>
       </table>
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="${msotablestyle};table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="${msotablestyle};background-color:transparent;width:590px;border:0;">
             <tr>
              <td align="left" style="Margin:0;padding-left:15px;padding-right:15px;padding-top:20px;padding-bottom:20px">
               <table cellpadding="0" cellspacing="0" width="100%" style="${msotablestyle}">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="${msotablestyle}">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:${fontfamily};line-height:18px;color:#B7B7B7;font-size:12px">
                          ${footertext}
                        </p></td>
                     </tr>
                   </table>
                  </td>
                 </tr>
               </table>
              </td>
             </tr>
           </table>
          </td>
         </tr>
       </table>
      </td>
     </tr>
   </table>
  </div> 
 </body>
</html>`;
  },

  resultType: coda.ValueType.String
});
