// const initFullProps = {
//   menubar: 'edit view format tools table help',
//   formats: {
//     tindent_format: { selector: 'p', styles: { 'text-indent': '40mm' } },
//   },
//   toolbar:
//     'fullscreen preview print | undo redo | sizeselect | fontselect |  fontsizeselect| bold italic backcolor |  \
//      alignleft aligncenter alignright alignjustify tindent_bttn | tfecha_bttn | \
//      bullist numlist outdent indent | removeformat | restoredraft wordcount',
//   plugins: [
//     'wordcount ',
//     'link print ',
//     'preview fullscreen',
//     'insertdatetime wordcount ',
//     'insertdatetime',
//     'pagebreak',
//   ],
//   mobile: {
//     theme: 'mobile',
//     toolbar: ['undo', 'bold', 'italic', 'styleselect, restoredraft'],
//   },
//   fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt',
//   contextmenu: ' copy  wordcount',
//   browser_spellcheck: true,
//   language: 'en',
//   language_url: '/tinymce/langs/es.js',
//   paste_data_images: false,
//   force_p_newlines: false,
//   branding: false,
//   forced_root_block: '',
//   setup: (editor) => {
//     editor.ui.registry.addIcon(
//       'calendar',
//       '<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="21px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><rect x="23.333" y="50" width="12" height="8" style="stroke:#ff0000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="50" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="23.333" y="66.666" 0width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="43.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><rect x="63.333" y="66.666" width="12" height="8" style="stroke:#000000;stroke-width:2;fill:#ffffff"/><path d="M83.333,16.666h-10V10h-6.666v6.667H33.333V10h-6.666v6.667h-10c-3.666,0-6.667,3.001-6.667,6.667v66.666h80V23.333 C90,19.667,86.999,16.666,83.333,16.666z M83.333,83.333H16.667v-40h66.666V83.333z M16.667,36.666V23.333h10V30h6.666v-6.667 h33.334V30h6.666v-6.667h10v13.333H16.667z"/></svg>'
//     );
//     editor.ui.registry.addButton('tfecha_bttn', {
//       text: '',
//       icon: 'calendar',
//       tooltip: 'Inserta la fecha del día',
//       onAction: function () {
//         var d = new Date();
//         var n = d.getDay();
//         var fecha: string = d.toLocaleDateString('es-ES', {
//           weekday: 'long',
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//         });
//         editor.execCommand('mceInsertContent', false, fecha);
//       },
//     });
//   },
//   height: '800px',
//   content_css: 'document',
//   content_style: `
//     html{
//       display: flex;
//       flex-flow: row nowrap;
//       justify-content: center;
//       margin: 0;
//       padding: 0;
//       background: rgb(248 249 250);
//     }
//
//     body {
//       zoom: 1.5;
//       width:150mm;
//       padding-left:20mm;
//       padding-right:20mm;
//       padding-top:15mm;
//       text-align: justify;
//       line-height: 1.5;
//       font-family: Arial;
//       font-size: 12pt;
//       background: rgb(248 249 250);
//       overflow-x: auto;
//       cursor: auto;
//       color: black;
//     }
//
//     .mce-content-body p {
//       margin: 0
//     }
//
//     figure {
//       outline: 3px solid #dedede;
//       position: relative;
//       display: inline-block
//     }
//     figure:hover {
//       outline-color: #ffc83d
//     }
//     figure > figcaption {
//       color: #333;
//       background-color: #f7f7f7;
//       text-align: center
//     }
//     `,
// };
//
// export default initFullProps;

var table =
  '<p>This table uses features of the non-editable plugin to make the text in the<br /><strong>top row</strong> and <strong>left column</strong> uneditable.</p>' +
  '    <table style="width: 60%; border-collapse: collapse;" border="1"> ' +
  '        <caption class="mceNonEditable">Ephox Sales Analysis</caption> ' +
  '       <tbody> ' +
  '          <tr class="mceNonEditable"> ' +
  '                <th style="width: 40%;">&nbsp;</th><th style="width: 15%;">Q1</th> ' +
  '                <th style="width: 15%;">Q2</th><th style="width: 15%;">Q3</th> ' +
  '                <th style="width: 15%;">Q4</th> ' +
  '            </tr> ' +
  '            <tr> ' +
  '                <td class="mceNonEditable">East Region</td> ' +
  '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
  '            </tr> ' +
  '            <tr> ' +
  '                <td class="mceNonEditable">Central Region</td> ' +
  '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
  '            </tr> ' +
  '            <tr> ' +
  '                <td class="mceNonEditable">West Region</td> ' +
  '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
  '            </tr> ' +
  '        </tbody> ' +
  '    </table>';

var table2 =
  '<div> ' +
  '        <p>' +
  '            Templates are a great way to help content authors get started creating content.  You can define the HTML for the template and ' +
  '            then when the author inserts the template they have a great start towards creating content! ' +
  '        </p> ' +
  '        <p> ' +
  '            In this example we create a simple table for providing product details for a product page on your web site.  The headings are ' +
  '            made non-editable by loading the non-editable plugin and placing the correct class on the appropriate table cells. ' +
  '        </p> ' +
  '        <table style="width:90%; border-collapse: collapse;" border="1"> ' +
  '        <tbody> ' +
  '        <tr style="height: 30px;"> ' +
  '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Name:</td><td style="width:60%;">{insert name here}</td> ' +
  '        </tr> ' +
  '        <tr style="height: 30px;"> ' +
  '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Description:</td><td style="width:60%;">{insert description here}</td> ' +
  '        </tr> ' +
  '        <tr style="height: 30px;"> ' +
  '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Price:</td><td style="width:60%;">{insert price here}</td> ' +
  '        </tr> ' +
  '        </tbody> ' +
  '        </table> ' +
  '    </div> ';

var initFullProps = {
  selector: 'textarea#classic',
  width: 755,
  height: 500,
  resize: false,
  autosave_ask_before_unload: false,
  powerpaste_allow_local_images: true,
  plugins: [
    'a11ychecker advcode advlist anchor autolink codesample fullscreen help image imagetools tinydrive',
    ' lists link media noneditable powerpaste preview',
    ' searchreplace table template tinymcespellchecker visualblocks wordcount',
  ],
  templates: [
    {
      title: 'Non-editable Example',
      description: 'Non-editable example.',
      content: table,
    },
    {
      title: 'Simple Table Example',
      description: 'Simple Table example.',
      content: table2,
    },
  ],
  toolbar:
    'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
  spellchecker_dialog: true,
  spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
  tinydrive_demo_files_url: '/docs/demo/tiny-drive-demo/demo_files.json',
  tinydrive_token_provider: function (success, failure) {
    success({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo',
    });
  },
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

export default initFullProps;
