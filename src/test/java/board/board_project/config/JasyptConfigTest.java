package board.board_project.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;

public class JasyptConfigTest {
    public String key = "secretKey";

    @Test
    void stringEncryptor() {
        String url = "jdbc:mariadb://1.248.227.176:3306/edu03";
        String username = "edu03_user";
        String password = "!qa2wS";

        System.out.println("En_url : " + jasyptEncoding(url));
        System.out.println("En_username : " + jasyptEncoding(username));
        System.out.println("En_password : " + jasyptEncoding(password));
    }


    public String jasyptEncoding(String value) {
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);
        return pbeEnc.encrypt(value);
    }
}
