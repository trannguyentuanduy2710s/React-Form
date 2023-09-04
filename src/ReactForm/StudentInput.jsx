import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactFromActions } from "../store/reactForm/slice";

const FormInput = () => {
    const { studentEdit } = useSelector((state) => state.ReactFormStudent);
    // console.log("studentEdit: ", studentEdit);

    //tạo state quản lý các ô input, lấy giá trị các ô input
    const [formValue, setFormValue] = useState();
    const [formError, setFormError] = useState();
    // console.log("formError: ", formError);
    // console.log("formValue: ", formValue);

    const dispatch = useDispatch();

    const validate = (element) => {
        const { name, validity, minLength, value } = element;

        const { valueMissing, patternMismatch, tooShort } = validity;

        let mess = "";

        if (valueMissing) {
            mess = `Vui lòng nhập ${name}`;
        } else if (tooShort || value.length < minLength) {
            mess = `Vui lòng nhập tối thiểu ${minLength} ký tự`;
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng định dạng ${name}`;
        }
        return mess;
    };

    const handleFormValue = () => (ev) => {
        const { id, value } = ev.target;

        let mess = validate(ev.target);

        setFormValue({
            // ...formValue,
            // [name]: ev.target.value,

            ...formValue,
            [id]: value,
        });

        setFormError({
            ...formError,
            [id]: mess,
        });
    };

    useEffect(() => {
        if (studentEdit) {
            setFormValue(studentEdit);
        }
    }, [studentEdit]);

    // console.log("Render");

    return (
        <div className="text-start">
            <form
                className="form-fluid row"
                noValidate
                onSubmit={(ev) => {
                    ev.preventDefault(); //chặn reload của browser khi submit form

                    const elements = document.querySelectorAll("input");
                    // console.log("element: ", elements);

                    let errors = {};

                    elements.forEach((element) => {
                        const { id } = element;

                        errors[id] = validate(element);
                    });

                    setFormError(errors);

                    let isFlag = false;
                    for (let key in errors) {
                        if (errors[key]) {
                            // console.log("formError[key]: ", errors[key]);
                            //nếu xuất hiện báo lỗi ghi đè isFlag đổi giá trị sang 'true'
                            isFlag = true;
                            break;
                        }
                    }
                    if (isFlag === true) {
                        return;
                    }

                    if (!studentEdit) {
                        dispatch(ReactFromActions.addStudent(formValue));
                    } else {
                        dispatch(ReactFromActions.updateStudent(formValue));
                    }

                    console.log("Thêm thành công");
                }}
            >
                <h2 className="bg-dark text-white p-2">Thông tin sinh viên</h2>
                <div className="col-6 mt-2">
                    <label htmlFor="maSV" className="form-label">
                        Mã SV
                    </label>
                    <input
                        required // bắt buộc phải được nhập
                        minLength={3}
                        maxLength={5}
                        type="text"
                        name="Mã sinh viên"
                        className="form-control"
                        id="maSV"
                        placeholder="Nhập mã sinh viên"
                        value={formValue?.maSV || ""}
                        // value = {studentEdit?.maSV || ''}
                        // onChange={(ev) => {
                        //     setFormValue({
                        //         ...formValue,
                        //         maSV: ev.target.value,
                        //     });
                        // }}
                        onChange={handleFormValue()}
                        // autoComplete="off"
                    />
                    {formError?.maSV && (
                        <p className="text-danger">{formError?.maSV}</p>
                    )}
                </div>

                <div className="col-6 mt-2">
                    <label htmlFor="name" className="form-label">
                        Họ tên
                    </label>
                    <input
                        required
                        pattern="[\p{L} ]+"
                        name="Họ tên"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập họ tên"
                        value={formValue?.name || ""}
                        onChange={handleFormValue()}
                        // autoComplete="off"
                    />
                    {formError?.name && (
                        <p className="text-danger">{formError?.name}</p>
                    )}
                </div>

                <div className="col-6 mt-2">
                    <label htmlFor="phone" className="form-label">
                        Số điện thoại
                    </label>
                    <input
                        maxLength={20}
                        pattern="[0-9]*$"
                        name="số điện thoại"
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        value={formValue?.phone || ""}
                        onChange={handleFormValue()}
                        // autoComplete="off"
                    />
                    {formError?.phone && (
                        <p className="text-danger">{formError?.phone}</p>
                    )}
                </div>

                <div className="col-6 mt-2">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        // validity
                        required
                        name="Email"
                        pattern="[a-zA-Z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder=""
                        value={formValue?.email || ""}
                        onChange={handleFormValue()}
                    />
                    {formError?.email && (
                        <p className="text-danger">{formError?.email}</p>
                    )}
                </div>
                <div className="mt-3 gap-3 d-flex">
                    {studentEdit ? (
                        <button className="btn btn-primary">Cập nhật</button>
                    ) : (
                        <button className="btn btn-success">Thêm sinh viên</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormInput;
