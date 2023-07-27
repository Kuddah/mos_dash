import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import TopBar from './TopBar';

//import actions
import {
    changeLayout,
    changeSidebarTheme,
    changeLayoutMode,
    changeLayoutWidth,
    changeLayoutPosition,
    changeTopbarTheme,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType,
    changeSidebarImageType
} from "../../slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
// import RightSidebar from '@common/RightSidebar';
import Footer from './Footer';

const Layout = ({ children }: any) => {

    const dispatch = useDispatch<any>();
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType
    } = useSelector((state: any) => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
        leftSidebarImageType: state.Layout.leftSidebarImageType,
    }));
    
    useEffect(() => {
        window.dispatchEvent(new Event('resize'))
      }, []);

    /*
    layout settings
    */
   useEffect(() => {
        if (
      
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topbarThemeType ||
            leftsidbarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType
        ) {
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLeftsidebarViewType(leftSidebarViewType));
            dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopbarTheme(topbarThemeType));
            dispatch(changeLayout(layoutType));
            dispatch(changeSidebarImageType(leftSidebarImageType))
        }
    }, [layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        dispatch]);

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                {/* <TopBar /> */}
                <Header />
                <Sidebar layoutType={layoutType} />
                <div className="main-content">
                    {children}
                    <Footer />
                </div>
                {/* <RightSidebar /> */}
            </div>
        </React.Fragment>
    );
}

export default Layout;