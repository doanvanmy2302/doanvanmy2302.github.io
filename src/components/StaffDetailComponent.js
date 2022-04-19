import React, {useState} from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody, Button,
        Modal, ModalHeader, ModalBody,
        Row, Col, Label} from 'reactstrap';
import { LocalForm, Control, Errors} from 'react-redux-form'
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';


// Hàm hiển thị thông tin chi tiết của nhân viên.
function RenderStaff({staff, departments, onChangeInfo }) {
    let doB = dateFormat(staff.doB, "dd/mm/yyyy");
    let startDate = dateFormat(staff.startDate, "dd/mm/yyyy");
    let position = staff.salaryScale > 1 ? "Quản lý" : "Nhân viên";
    let department = departments.find((department) => {
        return department.id === staff.departmentId;
    });
    let departmentName = department.name;
    return(
        <div className="row">
            <div className="col-12 col-md-4 col-lg-3 m-auto">
                <Card>
                    <CardBody>
                        <CardImg src={staff.image} alt={staff.name} />
                    </CardBody>
                    <Button color="success" onClick={onChangeInfo}>Cập Nhật</Button>
                </Card>
            </div>
            <div className="col-12 col-md-8 col-lg-9 p-3">
                <div className="input-group mb-1">
                    <span className="input-group-text">Họ và tên</span>
                    <input type="text" className="form-control" placeholder="Username" name="usrname" value={staff.name} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Vị trí</span>
                    <input type="text" className="form-control" value={position} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Ngày sinh</span>
                    <input type="text" className="form-control" value={doB} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Ngày vào công ty</span>
                    <input type="text" className="form-control" value={startDate} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Phòng ban</span>
                    <input type="text" className="form-control" value={departmentName} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Số ngày nghỉ còn lại</span>
                    <input type="text" className="form-control" value={staff.annualLeave} disabled />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text">Số ngày đã làm thêm</span>
                    <input type="text" className="form-control" value={staff.overTime} disabled />
                </div>
            </div>
        </div>
    );
}

// Hàm xử lý và hiển thị thông tin chi tiết của nhân viên.
const StaffDetail = (props) => {
    let staff = props.staff;
    
    // Validate Form
    const required = (val) => val !== '';
    const minLength = (min) => (val) => !(val) || (val.length >= min);
    const maxLength = (max) => (val) => !(val) || (val.length < max);
    const isNumber = (val) => !isNaN(Number(val));
    const salaryScaleValid = (val) => Number(val) >= 1.0 && Number(val) <= 3.0;

    const [ isModalOpen, setToggleModal ] = useState(false);
    const [ doB, setDoB ] = useState(dateFormat(props.staff.doB, "yyyy-mm-dd"));
    const [ startDate, setStartDate ] = useState(dateFormat(props.staff.startDate, "yyyy-mm-dd"));
    
    function handleToggleModal () {
        setToggleModal(!isModalOpen);
    }
    
    function onChangeInfo() {
        handleToggleModal()
    };

    function handleInputChange (values) {
        const target = values.target;
        const name = target.name;
        const value = target.value;
        if(name === 'doB') {
            setDoB(value);
        }
        else if(name === 'startDate') {
            setStartDate(value);
        }
        // setDoB([name], value);
        // setStartDate([name], value);

    };

   function onSubmit(values) {
       props.changeInfo(staff.id, values.name, values.doB, values.startDate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime);
       handleToggleModal()
   }

    if (staff != null) {
        return(
            <div className="container container-content">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to='/staffs'>Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <hr/>  
                <div className="row">
                    <div className="col-12 ">
                        <h3>Thông tin cơ bản</h3>
                    </div>
                </div> 
                <RenderStaff staff={staff} departments={props.departments.departments} onChangeInfo={onChangeInfo}/>
                <Modal isOpen={isModalOpen} toggle={handleToggleModal}>
                    <ModalHeader toggle={handleToggleModal}>Cập nhật thông tin</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={onSubmit}>
                            <Row className='form-group'>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name" name="name" 
                                        placeholder="Nhập họ tên nhân viên"
                                        className='form-control'
                                        defaultValue={props.staff.name}
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
                                        defaultValue={doB}
                                        value={doB}
                                        onChange={(modelValue) => handleInputChange(modelValue)}
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
                                        defaultValue={startDate}
                                        value={startDate}
                                        className='form-control'
                                        onChange={(modelValue) => handleInputChange(modelValue)}
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
                                                    defaultValue={props.staff.departmentId}
                                                    onChange={(modelValue) => handleInputChange(modelValue)}
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
                                        defaultValue={props.staff.salaryScale}
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
                                        defaultValue={props.staff.annualLeave}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime" id="overTime" name="overTime" 
                                        placeholder="1.0"
                                        className='form-control'
                                        defaultValue={props.staff.overTime}
                                    />
                                </Col>
                            </Row>
                            <hr/>
                            <Row className='form-group m-1'>
                                <Button type="submit" value='submit' color="primary">
                                    Cập nhật
                                </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    } else {
        return(
            <div></div>
        )
    }
}

export default StaffDetail;