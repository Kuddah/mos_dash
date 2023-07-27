import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { useProfile } from "@common/UserHooks";

import { logoutUser } from "Components/slices/thunk";

export default function Index() {
  const dispatch: any = useDispatch();
  const router = useRouter()
  const { userProfile, loading } = useProfile();

  useEffect(() => {
    if (!userProfile && loading) {
      dispatch(logoutUser());
    }
  }, [userProfile, loading, dispatch]);

  useEffect(() => {
    if (!userProfile && loading) {
      router.push("/auth/login");
    } else {
      router.push("/components");
    }
  }, [router, loading, userProfile]);

}