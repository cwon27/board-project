package board.board_project.config.security;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasyptConfig {
    @Value("${jasypt.encryptor.password}")
    private String pasKey;//properties 파일에서 해당하는 값을 가져옴

    @Bean("jasyptEncryptorDES")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();//string 암호화 객체
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();//string config 객체

        config.setPassword(pasKey);//암호화 키 -> 진짜 암호 아님
        config.setAlgorithm("PBEWithMD5AndDES");//알고리즘
        config.setKeyObtentionIterations("1000");//반복할 해싱 횟수
        config.setPoolSize("1");//인스턴스 pool
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");//salt 생성 클래스
        config.setStringOutputType("base64");//인코딩 방식
        encryptor.setConfig(config);
        return encryptor;
    }

}
