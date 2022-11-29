import React, {useState} from "react";
import Footers from "./Footer";
import Headers from "./Header";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
const {Footer} = Layout;


const HomePageUser: React.FC = () => {
    const [component, setComponent] = useState(<Outlet/>);

    return (
        <Layout>
            <Headers/>
            <Layout>
                    <>
                        {component}
                    </>
            </Layout>
            <Footer>
                <Footers></Footers>
            </Footer>
        </Layout>
    );
}

export default HomePageUser;