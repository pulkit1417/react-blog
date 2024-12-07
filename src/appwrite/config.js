import { isFileLoadingAllowed } from 'vite';
import conf from '../conf/appwrite.config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error){
            throw error;
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error){
            throw error;
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            );
            return true;
        }catch (error){
            throw error;
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            );
        } catch (error){
            throw error;
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                queries,
            );
        } catch (error){
            throw error;
        }
    }
    
    //file upload service
    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file,
            );
        } catch (error){
            throw error;
            return false;
        }
    }
    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                conf.appwritebucketid,
                fileId,
            );
            return true;
        } catch (error){
            throw error;
            return false;
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwritebucketid,
            fileId,
        );
    }
}

const service = new Service();
export default service;