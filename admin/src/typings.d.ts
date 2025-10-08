declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;


interface InitialState {
    loginUser?: API.SystemUserVo
    settings?: Partial<LayoutSettings>;
    loading?: boolean
  }


interface AccessType  {
    nodeId: string,
    id: string 
    type: string
    name: string
    permissionType: string,  // viewer editor

}

interface ResourceType {
    resourceId: string
    resourceType: "attachment" | "folder"  
}

interface CurrentFolderObject {
    nodeId: string,
    folderId: string
}