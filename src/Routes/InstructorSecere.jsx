import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import useInstructor from '../hooks/useInstructor';

const InstructorSecure = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    if (loading || isInstructorLoading) {
        return <button className="btn">
            <span className="loading loading-spinner"></span>
            loading
        </button>
    }
    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default InstructorSecure;