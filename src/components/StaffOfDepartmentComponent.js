import React from 'react';
import {Card, CardBody, CardTitle, CardImg, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

// Hàm hiển thị từng nhân viên của phòng ban.
function RenderStaffOfDep({item}) {
    let department = item.department === "Sale" ? "dept01" :
                    item.department === "HR" ? "antiquewhite" :
                    item.department === "Marketing" ? "aqua" :
                    item.department === "IT" ? "aquamarine" : "yellow";
    return(
        <Card id={item.id} className="Dept01">
            <CardBody>
                <CardImg src={item.image} alt={item.name}/>
                <CardTitle tag="p" className={department}>
                    {item.name}
                </CardTitle>
            </CardBody>
        </Card>
    );

}

// Hàm xử lý và hiển thị tất cả các nhân viên của phòng ban.
function StaffOfDepartment(props) {
    console.log(props.department)
    const list = props.items.map((item) => {
        return (
            <div key={item.id} className="col-6 col-md-4 col-lg-2 staff">
                <RenderStaffOfDep item={item} />
            </div>
        );
    })
    return(
        <div className="container container-content">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                    <Link to='/departments'>Phòng ban</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <hr/>
            <div className="row">
                <div className="col-12 ">
                    <h3>Danh sách nhân viên phòng {props.department.name}</h3>
                </div>
            </div>
            <div className="row"> 
                {list}
            </div>
        </div>
    );
}

export default StaffOfDepartment;