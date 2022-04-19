import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardImg, 
        InputGroup, Input, Button, 
        Form, FormGroup, Label, Row, Col,
        Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';


// Validate Form
const required = (val) => val;
const minLength = (min) => (val) => !(val) || (val.length >= min);
const maxLength = (max) => (val) => !(val) || (val.length < max);
const isNumber = (val) => !isNaN(Number(val));
const salaryScaleValid = (val) => Number(val) >= 1.0 && Number(val) <= 3.0;

// Form tìm kiếm và Thêm nhân viên mới.
class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            isModalOpen: false,
            doB: '',
            startDate: '',
            searchValue: ''
        }
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    }

// Hàm xử lý Submit Uncontrolled Form (Form Tìm kiếm nhân viên)
    handleSubmitSearch (e) {
        e.preventDefault(); 
        this.setState({
            searchValue: this.fullName.value,
        })
    };

// Hàm đóng/ mở Form Thêm nhân viên
    handleToggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
            })
    };
    
// Hàm xử lý, lấy dữ liệu đầu vào Controlled Form (Form Thêm nhân viên).
    handleInputChange(values) {
        const target = values.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value,
        });
    }

// Hàm xử lý Submit Controlled Form (Form THêm nhân viên)
    handleSubmitAdd(values) {
        this.props.postStaff(values.name, values.doB, values.startDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime);
    };

    onDelete(staffId) {
        this.props.onDelete(staffId);
    }

// Hiển thị ra view của component FormComponent
    render() {
        if(this.props.staffs){
            const filtered = !this.state.searchValue
                ? this.props.staffs 
                : this.props.staffs.filter((staff) => 
                    staff.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
                );
            var list = filtered.map((staff) => {
                return (
                    <div  key={staff.id}  className="col-6 col-md-4 col-lg-2 staff">
                        <RenderStaff item={staff} onDelete = { (staffId) => this.onDelete(staffId)}
                                    staffs={this.props.staffs}/>
                    </div>
                );
            });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12 col-md-6 header-add">
                        <h3>Nhân viên</h3>
                        <Button color="success" onClick={this.handleToggleModal}>
                            <i className="fa fa-plus-square" aria-hidden="true"></i>
                            {' '}
                            Thêm nhân viên
                        </Button>
                    </div>
                    <div className="col-12 col-md-6">
                        <Form onSubmit={this.handleSubmitSearch}>
                            <FormGroup>
                                <InputGroup>
                                    <Input 
                                        type="text" 
                                        placeholder="Nhập tên nhân viên..."
                                        innerRef={(input) => this.fullName = input}/>
                                    <Button type="submit" color="primary">Tìm kiếm</Button>
                                </InputGroup>   
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    {list}
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.handleToggleModal}>
                    <ModalHeader toggle={this.handleToggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmitAdd}>
                            <Row className='form-group'>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name" name="name" 
                                        placeholder="Nhập họ tên nhân viên"
                                        className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".name"
                                        show='touched'
                                        messages={{
                                            required: "Yêu cầu nhập!",
                                            minLength:'Yêu cầu nhiều hơn 2 ký tự!',
                                            maxLength: 'Yêu cầu ít hơn 30 ký tự!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Control type='date' model=".doB" id="doB" name="doB"
                                        className='form-control'
                                        value={this.state.doB}
                                        onChange={(modelValue) => this.handleInputChange(modelValue)}
                                        validators={{
                                            required,
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model='.doB'
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Control type="date" model='.startDate' id="startDate" name="startDate" 
                                        value={this.state.startDate}
                                        className='form-control'
                                        onChange={(modelValue) => this.handleInputChange(modelValue)}
                                        validators={{
                                            required,
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.startDate'
                                        show='touched'
                                        messages={{
                                            required: 'Yêu cầu nhập!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Control.select model=".departmentId" name="departmentId" id="departmentId"
                                                    className="form-control"
                                                    defaultValue='Dept01'
                                                    onChange={(modelValue) => this.handleInputChange(modelValue)}
                                                    >
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept05">Finance</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept04">IT</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Control.text model=".salaryScale" 
                                        id="salaryScale" name="salaryScale" 
                                        placeholder="1.0 đến 3.0"
                                        className="form-control"
                                        defaultValue={1.0}
                                        validators={{
                                            isNumber, salaryScaleValid,
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.salaryScale'
                                        show='touched'
                                        messages={{
                                            isNumber: 'Trường này phải có giá trị là số!',
                                            salaryScaleValid: 'Hệ số lương từ 1.0 đến 3.0'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave" 
                                        placeholder="1.0"
                                        className='form-control'
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime" id="overTime" name="overTime" 
                                        placeholder="1.0"
                                        className='form-control'
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <hr/>
                            <Row className='form-group m-1'>
                                <Button type="submit" value='submit' color="primary">
                                   Thêm
                                </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

// Hàm hiển thị ảnh, Họ và tên, Mã NV của từng nhân viên.
function RenderStaff ({ staffs, item, onDelete }) {
    return(
        <FadeTransform in
                        transformProps={{exitTransForm: 'scale(0.5) translateY(-50%)'}}>
            <Card id={item.id} className="Dept01">
                <CardBody>
                    <CardImg src={item.image} alt={item.name}/>
                    <CardTitle tag="p">
                        {item.name}
                    </CardTitle>
                    <CardTitle tag="p">
                        Mã NV: {staffs.indexOf(item)}
                    </CardTitle>
                    <div className="hide-show-btn">
                        <Link to={`/staffs/${item.id}`}>
                            <Button color="primary m-2" size="sm">Chi tiết</Button>
                        </Link>
                        <Button color="danger" size="sm" onClick = {() => {onDelete(item.id)}}>Xóa</Button>
                    </div>
                </CardBody>
            </Card>
        </FadeTransform>
    );
};

// Hàm xử lý lọc nhân viên, sắp xếp nhân viên theo vị trí và hiển thị toàn bộ nhân viên.
function Staffs(props) {
    if (props.staffs.isLoading === true) {
        return (
            <div className="container container-content p-4 text-center">
                <Loading/>
            </div>
        );
    }
    else if (props.staffs.errMess) {
        return(
            <div className="container container-content p-4 text-center">
                <h4>{props.staffs.errMess}</h4>
            </div>
        );
    } else
    return(
        <div className="container container-content">
            <FormComponent 
                staffs={props.staffs.staffs}
                postStaff={props.postStaff}
                onDelete={props.onDelete}
                changeInfo={props.changeInfo}
            />
        </div>
    );
}

export default Staffs;