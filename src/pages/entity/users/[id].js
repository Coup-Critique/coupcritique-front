// modules
import React from 'react';
// components
import UserArticle from '@/components/article/UserArticle';
import UserContainer from '@/containers/UserContainer';

const UserPage = () => <UserContainer Component={UserArticle} />;

export default UserPage;
