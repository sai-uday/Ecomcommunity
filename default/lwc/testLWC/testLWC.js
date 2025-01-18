import { LightningElement } from 'lwc';
import images_for_experience_cloud from '@salesforce/resourceUrl/images_for_experience_cloud';
export default class TestLWC extends LightningElement {
    image1=images_for_experience_cloud+'/static images/test 1.jpg';
    image2=images_for_experience_cloud+'/static images/test 2.jpg';
    image3=images_for_experience_cloud+'/static images/test 3.jpg';
    
}