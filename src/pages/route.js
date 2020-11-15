import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  BrowserRouter,
} from "react-router-dom";
import React from "react";

import Dashboard from "./Dashboard";
/*Reset Password*/
import ResetPassword from "../pages/Setting/ResetPassword";
/*User */
import UserList from "../pages/Master/User/List";
import UserDetail from "../pages/Master/User/Detail";
/*Car*/
import CarList from "../pages/Car/CarImfomation/List";
import CarDetail from "../pages/Car/CarImfomation/Detail";
import Action from "../pages/Car/CarImfomation/Action";
import DriverList from "../pages/Car/Driver/List";
import DriverDetail from "../pages/Car/Driver/Detail";
import ClashList from "../pages/Car/Clash/List";
import ClashDetail from "../pages/Car/Clash/Detail";
import InsulanceList from "../pages/Car/Insurance/List";
import InsulanceDetail from "../pages/Car/Insurance/Detail";
import OilList from "./Car/OilCard/List";
import OilDetail from "./Car/OilCard/Detail";
import TestMap from "./TestMap/TestMap";

//Setting
import OwnerVehicleList from "../pages/Setting/Vehicle/OwnerVehicle/List";

function Pages() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}testmap`} component={TestMap} />
        <Redirect exact from={`${path}`} to={`${path}dashboard`} />
        <Route exact path={`${path}dashboard`} component={Dashboard} />
        <Route
          exact
          path={`${path}resetpassword/:id`}
          component={ResetPassword}
        />
        <Route exact path={`${path}master/user`} component={UserList} />
        <Route exact path={`${path}master/user/:id`} component={UserDetail} />
        <Route exact path={`${path}car/carInfomation`} component={CarList} />
        <Route
          exact
          path={`${path}car/carInfomation/:id`}
          component={CarDetail}
        />
        <Route
          exact
          path={`${path}car/carInfomation-create`}
          component={Action}
        />
        <Route exact path={`${path}car/driver`} component={DriverList} />
        <Route exact path={`${path}car/driver/:id`} component={DriverDetail} />
        <Route exact path={`${path}car/clash`} component={ClashList} />
        <Route exact path={`${path}car/clash/:id`} component={ClashDetail} />
        <Route exact path={`${path}car/insurance`} component={InsulanceList} />
        <Route
          exact
          path={`${path}car/insurance/:id`}
          component={InsulanceDetail}
        />
        <Route exact path={`${path}car/oilcard`} component={OilList} />
        <Route exact path={`${path}car/oilcard/:id`} component={OilDetail} />

        {/* Vehicle */}
        <Route
          exact
          path={`${path}setting/ownerVehicle`}
          component={OwnerVehicleList}
        />
      </Switch>
    </div>
  );
}

export default Pages;
