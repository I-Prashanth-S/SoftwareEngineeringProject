import React from 'react';
import { Form, Col, Button } from 'react-bootstrap'

import { DatePickerFromTo } from './datepicker_fromto.js'
// import { Loading } from './loading'

const serverUrl = 'http://localhost:5000/'

export class Apply extends React.Component {
	constructor(props) {
		super(props);
		this.formData = {
			leaveType: null,
			appliedby: this.props.username,
			startDate: null,
			endDate: null,
			reason: null,
		};
		this.today = new Date();
	}

	handleApplyForm = (e) => {
		e.preventDefault();
		// let self = this;
		let valid = false;
		var leaveTypeRadio = document.getElementsByName("formHorizontalRadios");
		for (var i = 0; i < leaveTypeRadio.length; i++) {
			if (leaveTypeRadio[i].checked) {
				this.formData.leaveType = leaveTypeRadio[i].value;
				valid = true;
			}
		}
		this.formData.reason = document.getElementById("reason").value;
		
		if(!valid)
		{
			return alert("Select leave type"); 
		}
		if(!this.formData.reason)
		{
			return alert("Enter Reason");
		}

		// Deal This Part!!
		
		// var Strtoday =  self.today.getDate()+'/'+(self.today.getMonth()+1)+'/'+self.today.getFullYear();
		// self.today = Strtoday; 

		// if(!this.formData.startDate || !this.formData.endDate)
		// {
		// 	return alert("Enter Dates");
		// }
		// var T = new Date(self.today);
		// var S = new Date(this.formData.startDate);
		// var E = new Date(this.formData.endDate);
		// console.log(T);console.log(S);console.log(E);
		// if(S<T || S>E)
		// {
		// 	return alert("Improper Dates");
		// }
		alert("Im pausing, check log!");
		console.log(this.formData);

		fetch(serverUrl+"apply",{
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
			body: JSON.stringify(this.formData)
		}).then( response=>{
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		}).then(data=>{
			this.setState({isLoaded: true},);
		}).catch(err=>{
			console.log(err);
		})
	}
	handlefromDate = (val) => {
		this.formData.startDate = val;
	}
	handletoDate = (val) => {
		this.formData.endDate = val;
	}

	render() {
		if(this.props.isHOD)
		{
			return "Only faculties can apply leave";
		}
		else
		{
			return (
				<div>
					<h3 className = 'leftAllignFormHeader'>Leave Application</h3>
					<Form className = "Form" onSubmit={this.handleApplyForm}>
						<fieldset>
							<Col>
							<Form.Group id="leaveType">
								<Form.Label className="formHeader" as="legend" >
									Type of Leave
								</Form.Label>
									<Form.Check
										type="radio"
										label="Casual Leave"
										name="formHorizontalRadios"
										id="formHorizontalRadios1"
										value="CL"
									/>
									<Form.Check
										type="radio"
										label="Sick Leave"
										name="formHorizontalRadios"
										id="formHorizontalRadios2"
										value="SL"
									/>
									<Form.Check
										type="radio"
										label="Privilege Leave"
										name="formHorizontalRadios"
										id="formHorizontalRadios3"
										value="PL"
									/>
							</Form.Group>
							</Col>
						</fieldset>

						<br></br>

						<Col>
							<span className="formHeaderspl">Enter Dates</span>
							<DatePickerFromTo fromDate={this.handlefromDate} toDate={this.handletoDate} />
						</Col>

						<br></br>
						<br></br>
						<Col>
							<Form.Group controlId="exampleForm.ControlTextarea1" value="reason">
								<Form.Label className="formHeader">Reason</Form.Label>
								<Form.Control as="textarea" rows="2" id="reason" />
							</Form.Group>
						</Col>

						<br></br>

						<Col>
							<Button variant="primary" type="submit">
								Apply
						</Button>
						</Col>
					</Form>
				</div>
			);
		}
	}
}