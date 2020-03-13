import React, { Component } from 'react';
import './ViewSchedule.css';
// import {EmailShareButton,FacebookShareButton,WhatsappShareButton} from "react-share";
import { Facebook, Twitter } from 'react-sharingbuttons';
import '../node_modules/react-sharingbuttons/dist/main.css';
import Email from 'react-sharingbuttons/dist/buttons/Email';
// import Select from 'react-select';
import axios from 'axios';


class ViewCoursePlan extends Component {
    state = { 
        id : this.props.facultyId,
        filename:''
     }
     
     sharingButtons(){
        // const url = 'https://github.com/caspg/react-sharingbuttons'
        const url = `https://seschedule.s3.amazonaws.com/imgs/${this.state.id}.jpg`;
        const shareText = 'This is my Course Plan!'
        return (
          <div>
            <Facebook url={url}/>
            <Twitter url={url} shareText={shareText} />
            <Email url={url} subject={shareText} />
          </div>
        );
      }


      handleUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        if(this.state.filename!='')
          data.append( 'profileImage', this.state.filename, this.state.filename.name );
      console.log("UPLOADING IMAGE",this.state.filename);
      axios.post( 'http://localhost:3001/img', data, {
          headers: {
           'accept': 'application/json',
           'Accept-Language': 'en-US,en;q=0.8',
           'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
          }
         })
          .then( ( response ) => {
      if ( 200 === response.status ) {
            // If file size is larger than expected.
            if( response.data.error ) {
             if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
             alert( 'Max size: 2MB');
             } else {
              console.log( response.data );
      // If not the given file type
              alert( response.data.error );
             }
            } 
            else {
             // Success
             let fileName = response.data;
             if(fileName==='Error: No File Selected')
             alert("SELECT A FILE!!!!");
    
             if(fileName!='Error: No File Selected')
             alert( 'Schedule has been uploaded to cloud storage' );
            }
           }
        else {
         // if file not selected throw error
       console.log( 'Please upload file'+ 'red' );
        }
        
    
          }).catch( ( error ) => {
          // If another error
           console.log( error+ 'red' );
         });
        } 



        handleSubmit = (event) => {

          event.preventDefault();
          this.handleUpload(event);
        }
        upload=(e)=>{
          console.log(e.target.files[0]);
          this.setState({filename:e.target.files[0]});
        }






    render() { 
        // let file = require('./imgs/' + this.state.id +'.jpg');
        const url = `https://seschedule.s3.amazonaws.com/imgs/c${this.state.id}.pdf`;
        return ( 
            <div className = "Schedule">
                <h3>
                    My Course Plan
                </h3>
                {this.sharingButtons()}
                <embed src={url} width="600" height="500" alt="faculty Course Plan not Updated" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"></embed>
                <div>
                <input type='file' onChange={this.upload}/>
                <input type='submit' onClick={this.handleSubmit} className="btn btn-primary"/>
                </div>
                
            </div>
         );
    }
}
 
export default ViewCoursePlan;