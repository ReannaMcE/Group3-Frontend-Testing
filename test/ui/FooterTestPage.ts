import { basepage } from './basepage';

export class FooterTestPage extends basepage {


    public static async clickFacebook(): Promise<void> {
        await FooterTestPage.clickLink("facebook");
    }

    public static async clickTwitter(): Promise<void> {
        await FooterTestPage.clickLink("twitter");
    }

    public static async clickInstagram(): Promise<void> {
        await FooterTestPage.clickLink("instagram");
    }

    public static async assertFBAndGoBack(page: string): Promise<void> {
        await FooterTestPage.assertAndGoBack('facebook.com/KainosSoftware', page);
    }
    
    public static async assertTwitterAndGoBack(page: string): Promise<void> {
        await FooterTestPage.assertAndGoBack('x.com', page);
    }

    public static async assertIGAndGoBack(page: string): Promise<void> {
        await FooterTestPage.assertAndGoBack('instagram.com', page);
    }
          
   
}



