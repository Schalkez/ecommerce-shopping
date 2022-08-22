import React from 'react';
import { Link } from 'react-router-dom'

function MenuLeftMyProduct(props) {
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/account">
                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                Account
                            </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                            <Link data-toggle="collapse" data-parent="#accordian" to="/my-product">
                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                My product
                            </Link>
                            </h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MenuLeftMyProduct;