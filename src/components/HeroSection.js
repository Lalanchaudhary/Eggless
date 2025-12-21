import React from "react";
import cake from '../assets/chrismas_banner.png'
import CakeGallery from './CakeGallery';
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";
import FallingSnow from "./FallingSnow";
import garland from '../assets/garland2.png'
import bell from '../assets/bell2.png'
import santa from '../assets/santa2.png'
const HeroSection = () => {
  const navigate = useNavigate();
  let Heroimages = [
    {
      image: "https://i.pinimg.com/736x/39/8c/b3/398cb39a0415321977ee080472e85c48.jpg",
      path: '/all-cakes'
    },
    {
      image: "https://i.pinimg.com/736x/56/c4/ff/56c4fff60e85560acedeedb4fee972bb.jpg",
      path: '/birthday-cakes'
    },
    {
      image: "https://i.pinimg.com/736x/68/65/f3/6865f3f5a1af9c8d425ce509f89e3191.jpg",
      path: '/anniversary'
    },
    {
      image: "https://bkmedia.bakingo.com/regular-cake-desktop_12.jpg",
      path: '/all-cakes'
    }
  ]

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      review: "The eggless chocolate cake was absolutely divine! My daughter's birthday was made extra special. The cake was moist, rich, and everyone kept asking where I got it from. Will definitely order again!",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFhUXGBsYGBcXFxUYFxcXFxUYFxcYGBcYHSggGBolGxcYITEhJSkrLy4uGB8zODMtNygtLisBCgoKDg0OGhAQFy0fHiUtLS0tLS0tLS0tListLS0tLS0tLS0tLS0rLSstLS0rLS0tLS0tLSstLS0rLS0tLS0tLf/AABEIAPsAyQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAQIEBQYHAAj/xABEEAABAwIDBAgFAQYEAwkAAAABAAIRAyEEEjEFQVFhBhMicYGRofAHMrHB0eEUI0JScvEzYoKiU7LiFyQ0Q0RUg5LT/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAJREBAQADAAIBBAIDAQAAAAAAAAECAxEhMRIEE0FRImEycZEj/9oADAMBAAIRAxEAPwDSB3gnB/JPSnuWbsMvUDFVr2aSZBsJVolAU4qFSrPj/DPdLfyidsj5Y5SFKATwETqJTYRu38UdoKeCJj3ZOJQCCe0Jd+qeCgaAvR3J88l4oBuYeKH1SO6yfCAQYlhEjRNaLoGtYdUvVogO5IqB9UEpojgnSlKAb6AOqE3BADK05RwAHGSpASyoI37LH8R4bvwnvw0o6UBXh1Q7Y2PWqQKdYtabObpbeZF3W3Ko/wCzpv8A7mr/APer/wDotvCWFOHVdN05qDTcTBIg7xwPBGYFR4BOc1LCWeKDwalDUkJWk70Hl4t5omWdE9tPU+wgCAJ09ERjU8MgW15ooAUAMnJP6vRONQXuLJWmdI04/RAPIkAO9SQJS5EEdwQxqpFRu5BA7So9CR4TyEoCATXTde9+ic6yUt098fyoGEJR6JXNnReNPUTG7zQJuTgmmnEeiJCBAE5ey/lLBVFdA1mN6XJrfu+68G7j79/ZPa21lB5gt9vVLlt796JYvN50T8oPv3wQJ1aK1kp4YiRvlUMY0eaeWwJNuay3SXpthcIHDMKlYWFNjgXTzP8ADquT7b6YY7GOMve1l3dXTcWtA5kQXW4nyVkR1bb/AE8wlB3VBwqVJ0bEAn+Zxt4LFY74h4jN+7dRY3+sG27UXHcY5rCPxNRsZw3uc3MDviHAif0Rw+niHSWBkQDkIbYWkC+4TYeSvF6t8Z0oxNd3axJZEt7BLWkHi4AAd8ptLaW0KAFRtWrA3xnYLmxmWnnN1U1KYZZhDgHWkFrmk6Z9zm7pjuhTtmtnMMhpPA/mOV0C3ZqS2J8eChGy2L8WSCG4mjO6aRv5ON7TvXTNh7coYtmei8OFwRoQRqC03B5FfP2Iw3WUOtaxgc2cwb2TYmSafGIIIKibD25Ww1XrqLo1Lmz2XA2036+icH0zVZvUdrO14fhV3R7pPQxbOw8Fw1E9yuGNv4LkMc1eDUXKmkclQKoPfDgmE8+O5FI9+qaBxH3UDMmvu69U9+SJHvySFiBoKcGpA36pzN06/p+qDzU6F6N+9JBQQMtkQNTQ3l79hPjkgVlM3m/4/K85h0HvilZJPu+mnBSKYQKxv6LAfE/pZ+ysGGouHXVBc/8ADYbSf8xOnie/UdKekDcHhnViL6NB3uM5dF847Rx761R9Wo4uqPdLid/4iwA4LqRKGXnNJcS6ZmZk/U3S9c/5jJHO7fI2RW1bEvMwIaJ052QRUbpl9SukI2sf7W9BqrHAYNtWWvysdYgkOB8pA56FVlTjEDd73laPo88VmdUWA1G3a6YdGsA7o1keNpRYfQaWh9KqG5qQHaNw+nJGupaCQeQnmnUC0Np1AXECWzrkl0ZT6kTyiULE4ote15aSQcrxcWAgExoSD3axbsqK2uKZLm9qi/5mWlvC2gItG46cCeXQmKq9p57PaZlAMGd7XZhwIF+B3KmBgydffmrKvhi54DTINxe8cpPCbSoWLoQTLgSOAHrFh+iSpZVjsDbDqFQlhc0lscYeXNvG4QNOXgvoLoztunimZmHQC0Ec18yMeQZbIP8AlJ04cYXWPhBtFjHCmTDnGMpN7hvai2sATwjglI68QhuYpJahuaoAEIcKQ5qHCgGffim1XgAncNUU07ykdTQCARgEAUjxRmSLHwQeDNE6ClB5heyH3KCFCVreGqQDh5ojHDiqPNpmEQstATOsCVr7z4X3lBy7464khmFpTYl7yN8tAaD/ALnea5DC6v8AHXDnNhqsjLleznmkO8lytzYieE+ei6npKYpmGwD3DM0SJjUWPA8O9BotE3n01530Wr2RgQGSXNB3ZSCNbzMk3GgS0kQcHg2jsVmOAcDcGL9xESPBSqWznUCHMy1G/MGO7D7TDmOBljh67tUHFtOYus0ngQJ72kEHTgUbZeyauIeKbJaJvBcG335NB5Bc3LkaTG30r9oYsVSXdoO0M2Pc5v49ComGpvnKJINjEkRzC6vs/wCGYMZnTz3+a1mB6C4dgEsaYPAfdYX6j9RvNH7rl2yejlV7QwBwkWfFwN4HmdyB0u6HOoML2Elu+fC/vgu30dm06chrY/RVm2sEKjHNIkEFeb7+Uy63+1jcePmx5PMeJ04TwWg6BbV6jFUyRZzgLBpMzA3SL8D9UPa2zSwvaBo5wHEwe+4gBV2BcWOzAXFwTy3D39V9GZTKPn5Y3GvrGk4OaDxErxCqei1frMNSfmmWjeSCrYtH9lE4YWJpYnuKQFAwtXi1K6oEhdwQNDUuTkvGqJTwoBikOCXw9ERJmQVTqI4nzPcnGg08fMp5YCL96IVeAYozaSO7Xz3JThhOYzYQLn6IrUUtTg558Z9mZ8AKjR/hVGuMfyulh8pC4abwvpbpzh+s2dim5cx6pxA5tGYRzsvmpw3rqJUvZ3VX6yeUCR43mFdUMbUeAxuXLuHDmDqFV08MMgPFWmwaYzgc1jsz5Oxvrw7eVe7O2K58W1Nz71W/2JsllECBfeUDZVOwi1lcNBm5Xhuy5PoTXMZ4WuBr3Vrnss5RqQVZ08QSrK4yxSKhUCqLp73qO+sJWWTvGOe9PNkNLieN9OOvosA/DxMN01ExbMDrx0IO6V2LpVs91WnLIzNmJXJ8XiHZix7YdcHdE2PvkF7Pp8/HHl+ow/Lt/wAM3Ts+jeYbE+wtSQsl8KyP2BsT8z7mIPaIkRx1WuIXqeOhFiQt9+SIR9gky8/fsIBlm6F7Knx78V7vQDNNI1kGyLCWFKBkIfV8lJaxKgqWbvVOaEkSiDyVCU26zxUgBBAv9fsjtKAdfBh7HMPyuBBHIiCvl3pTst2GxdaiQRlecs72Ey0+UL6rFUDXSVy/47dHM1GnjWNk0zkqRHyO0ce58D/Uko5RhKk044KXsp5zgjioWBp/u54z6L2G2o2nIAzE6LLPHvZHowyk511rYGKmAtRIIsuO7O6VOZE0XDu3eYW02V0upugTGljrovHddx9vdNmOXppg66Jjtv4fDNDq1QNtpNyeQ1KHg2dc0ubdY7pc3qXZiyXcXX03DgpORbOrCp0+qVyRhsJUdwc4Q2/MxCn4fDbRcA93Ut/yuB0kbwdYWCdtbHUeqe1v7tzoPVtz1AJG64BI0t+FtcHV2iGUnucXh5OZj2sY6mMxy/LZ3Zgkd91rlj/HvIwxy/l8e1e4ZtTL2wAeS518QcDlrNqNHziLfzC3rIXXMJSJbLgAY0/VYn4g4HNQzb6bsw5LHXfjnK1znywsX2zsG/A4UFnWvDAXZQWgfzOkWB381r8LiRUpte3RwDvNUezdpitSDajcocAWwSZa8ZmnxBCl9EsMaeHFI/8Aluewf0tdDfQBejTnflzrH6jDH7fecsv/AGVaDU+H3Ske/BEI99yblXrfPDczQ816BKIOKaRogbCQlP8Af0THNSrBN68ko04EX8ead1agqGp4amAozVQjGorW+n5SBPBQFpt3Ku6YVqbcDiXVWGpTFJ2Zg1cCIgcNdd2qsqYQ9qUS+jVYAJcxzQDpcEKK+X8HSmgWji4X11nzhEwNZmHIysDnnSdyj4HMG1WOBDhcg6gglrp5ghDw7nZgRM7tfRZ5T31vj49NZsXGYjEVzQr0zBIALafYaJlznG0jLMQZmO40nS7ZDsJVEOkG7SLWmIiSeHmtdsEVcvacBbdJd5nRZnpo/NUA3D1WWGyXLkjfPXZj3vXTfhZtIvogHWFfdI9kCuwti+oMaFYP4O4u5ZwP1XWqrxK8+U5a276v9OdbP6M1WOBNXQzdkrW4Og0RncXO8h5Kfiy1CwVMZlP6dW9nan0m20VDt3ChzXNOhFx3rUubZUW1zYkpsx4z15dqr2HSNSlhQ09ii1zHEzctdDWCdYA1WwwNOGnm4n6LI/D2oScRSv2ak8u0Jtw0W3ayO5enRrvyuTz/AFG3s+BrwBfcvNCe4JGA29e9et4zCvAJSOCdCAMWhOyJxSgKVSgJUoC9CChCMxAaUWkqgzUVoQ2BGagJRanVAlpBeqBRXA/iZsT9m2oXARTxLS8bhmIioBzzjN/8io9jlpdke0WMLu/xE2CzF4F4I7dL97Tdva5okx3iRC+f8NVIcHxF4PIjX1WW3Hsb6cvLqOAwTSwFc46cCKkDjC3eA2oOq8PsuedJ6+asHawSSO+y8mmfye7df4NP8NAabp43K7I+m0sDnOAC+cdk9IalGr+6YC02h1j3yJhdCPSygKTKeLDapIzZYzMjdY/MVplrvfP5cY543Gcvpv61JpENcHdxUVuemb6LJ4Lp1g6Ay06QptN4a0AGdSI1UvD/ABApOdlIseX1Wd138O/uT11tKePkKk2/jP3bve9JR2lTdT65hEWt37ljemu2Q49U075tysPv5LiS2+UvJOxcfCrG/wDfq9OSQ9mYcJY4CPJxPgurwuJfBTt46o7+WiR49YPqLruEL6WE5Hzdl7laZlSAJ68SunAQavQiQvEIBkLzN6IQkayJUUgCZJ4fVFheyIM00o9MoDAj02iydEhgRW8kJkBGaRrZOg9NOc2UxpCMxAOuzMxzSLEEHuIuvmDpDhnYXGVqTtM5I3an0vK+pwFxj45dFiHDG0wSDDXgXvMA+o8uSWdiy8rEUdpQzXcqTH4kGCIJOg36m58vUKHSxFo3KTs7Dud+8AADW5QeYIJJB8VljrmNtrfLbllyQTYmGe52YmwuAeZnThYrb1cNgqjA2ox5qsabkwJOp7N/RY3ZWGeXy45u8wO6Bqum7KfTFNtqTBvNguNmXn29f02vD49qLgNiZmFzcOC2ModUGUaRABvv4KJjvh/iXtNel1Yc35WAOGaLzcweVuK3GyNpUqpyNOeCRAHZBWoIysk8Fl87PTvZ8LOccf2C9zMG7PIIqSRe2U3A4XCyNfFlxc43LjInztyWj6b48MrOpNsHEkjdck+IufNZXZ+Dfia/U0wc7ob3AmC7hYAny3laYY97a8uzPniOsfALZs06+LLYDndWwzOYC7j4H6uXW1QdDNnsw1AYdg7NMADnxPmJ8VoIXpwymU7Hkzx+N5SQvQlASwunBsJPBOhKgYSvBPhJCcUkL0J0L0IMs0I7B9/ygiZUmkFyoze5GaAmMFkZuse9EBGBGaExgRWNSBwCj7SwDK9J9KoJa8EHj3jgRqO5SWqo6SdKMLgaZfiKzWmJawXqP5MYLnv0G8hdRHzf8QehdbZ9eIzU3zleNHRe9uyY3eSocHiiON/UTN1s+m/xSr7QHUMpso0JnQVKpH9bhDf9IB5nfg30SLC41HIe4Usl8LjbPLQYFpmBoYnyt9VpMJsAOZcncT4X3+7LKbMxzWi+aZi/DsiT4uNtwA1lXOG6UOAyjSSOGm+0wvLnrzl8Pbr2YWeXVeiuDoUGAtjTX33qf0k6Q06VOA4ZiPqDpxNlxyp0sqBpDTu3AzEz+AqzH7cdXOUOJgSDInfIgxaSSpjqtXZtxC2xjetqh7j2m5SNSXAmDB1nlyXTfhrsd9FrnPH7xxF3Am1iA3iNbniqHoT0MqVnDEVWlrWumm0iJgznIOl4I4Quu0cKLe/RXdnJPjHGrC/5UanijSOfLIiCNDHEK2w20qbxZ45g2I81V1mSFEfggRoscN2WHj8O89OOfn1WqYbSDISrknSzZwwmXE4Yuo1S7IeqJaHggm7WwJka96P0Y+JFRgLMW11QB0dY0AOAgntDR2nI96+jq/8AXD5YvDsx+GXK6oEsKv2PtrD4puahVa8bwPmHe03CsVeOSL0JV5AkL0JV5QZdh+v11+6k01GbuPj4XUvDtOhjw58u9cuh6bNL6flHa1NY1V22+kmFwbc2IrNZwbMvdyDGy4+UILlrVU9I+lmDwLc2JrNaSJbTHaqO/pYLxzNua5F0u+M9aoDTwLDRbp1r4NU/0tu1nfc9y5XVrPqvNSo5z3OMlziS5x4uJuV3MXNrqfSr4016gLMGz9nbue7K+sRxi7Kf+48CFyrGYypVe6pVe573auc4uce8m6E+5hIQuuI9S1UtpmFDBgqXRCzzaYHnCmHEXkW5GQZ56EeKGaDje4cLQrjA0pU2tst5GYCVj93nht9nvlA2D0fNd4DqwZy1MLq/RnoFhaTm1SMzwBxiReQN1/os10SwdMdpwh3OV0/ZlQZbXWWe3K/ltjqxk9J1GkAAALBSmBAY+VJYF52tp4ga93nYItKnqh1aGZpbxHlwKxvSzpQadDqA797pVcJ7IFso4ly206rsvI8+zZMZ1R/ELpCKrhRo3DXa6y64zdwmBxJ7lkqoyxEAC7iP4jxJF9Uai2Zedd07h+Ur2yDbkvu6tWOvH4x8zZsud7SYao5jxUpve124gxfvat3sX4kVWQ2uwVQNSOy8fZ3p3rnwJ46IlKoB3xpx8F1lhMvbmZWO97F6R4bFAdVUBd/I6zxx7J18JVuvnFmZrg5p3zImfTTwK2exfiDiKJDaw66nxJh4/wBW/wAZXnz0Wemk2ft1teWf2Z0zwdaAKuRx0bUGTyJ7J8Cr7rW/zDzCwss9tOs/TprOdNum1LZzWjL1td0FtIOyw3e97gDlFiBaSeUkJ036XswFMQA+u8Hq2HdFi98aMHDU6cSOGYjFuqvfXrONSrUd2nHfI3AcIgDQAQmvX8vNXLPi8218RNo4jWt1LDpTog07c3/P6juWXdSJlzpvck6k8STqeZVjh8Pvd74BAxDS88GjXVeqa5GPz6qjTzG2iWq3KFaYbD8NNyrdpC8LnLHk6sy7eI1IalLTG9SW4eGyUmFpS2VxMa6+SK1sqXgCA4B9mnfuHfyXsPQkwrKhg+V+emvon2vlPJ9z43w1OyNkZYJEjjx/K1dHABzYhc/2VtGrQMMu0a03Xbe5ynVn071sdi9LaGlRr6Z32zgeLb+i8G36TZjezzHv1fVa7OXwscNsnK7RXeGdlsm4fbOEcJFen4kt/wCZNxO1sK3/ANRT8HSfIarD7Wf6rb7mH7i3wL5KuGWElYA9NKFP/DDqh3WyN8zf0VLtbpPXxPZmGH+BshsDif4ltq+j2Ze5yMNv1OE9XrXdJumQaHUsOZdo6p/C3+niea51XJcS5xm88yZ1PO/vc5x43P8AtHv3wQnNkmfpw+y+tp0465yPnbNlzvaIHWJufJGpjs6bu7coj+H35Kwa2Gwd3ktmaCGTe/rvUOo8g+44qfSInu9PdkLaNCGEj3+qoLh3ZgF51O8me/8AKhbPxB37/dlauiJt4oBNAIgkEeRHv2F79lbw9UhJHdz+yd13d5n8JwZLbO1KmJqvrVHS55k8ANzWjcALD+6BgmbzxHhZyDSuCpmEZOaOAPqB9yscMXWVFcC4/wCX6pa9gGjejVWgQB3eKjYRuarybqtOOE7qQG6/RZ9tLrK0DQK82nisrCdN6D0bwljUOpuucp2yOsfE6LjsDlp/rO5R9j4cGmbTCnbXqWQtiNiiSrzyn4Q6DIdaLcvJTGUdf1UZgvPG3qrWlRGWffcrBBgjv7xbjuRqcbx5flOe1JTP6BOCQGczHhbkmhg4n0/Ce5sfgJGMnjx+6BaWUbp4zJt+e5TmVS78RwVcXAHf+VPwIBElUeqyN4+ibSFu9Cxtobvnn+UaIbb34oPGcwF/Gdysh8h/sqmiTm9929W9J0tju9ygqtHka7x4c1PxNGWKtxhLHyRb9VeUAHsCDMYnCuZ2mzAv6hWWzMeHiApbqcnju3KgxtP9nrB4HYd5AmyC8x9MEcBFz9u9V37e3+Vyn1RmZAPzOaPNwafGCrfqR/w2+f8A0paccsz5Ydu3q82dS1je0/SfsqN4mi7lcK86PulrDuP3WeHtcvSNi6kBx4ImymxSzn+OXHumyhbWBL20gfmdB8NVN2rXDGhu4bvQALrvn/TnnhBxJNao2kN5l3ID36LStaGNDRoBwI+ir9iYEsaaj/mfry0siVa0zG+3krj+6t/SFtit2eein4Wllw7RoqrG0yYHNX2lIaWEBJ7T8K7qpPIFW7WWjh4quwYlxt+Fb029/qiq6oBv9/lMwwvAR8U0ybctSvbJZrI8VQtQQNUZtH6JtVlyCTyRaThpKCpru7cd3v6LRUKYDB5rN1DNUAakrS4iAyOUX5KCmDpqzwUrFVIsoWDGp3k+komKfcCNO/vVEjDNE3CnYVwv9FFpM7P9/wAI2z9d/wDfvQLtHCZgYF4t78Emya8QN9rSprvnFrRzKq67clfkff5UFviKcHMNCq7a2GFSk9sX1tvi4Voa2Qw75T6eSWtQEWuCLEKjPdHcTmZTGsPAi+4E/ZaXrzw9Qsj0bYeuc3cKh/5HrTdYOSki1zaqAM0fK4GRwJ39yndF6hNON7SfyoIEOI3EaI/RX+Mc/ss8f8ot9UWp/wCNLtzW5vMT917Z9E1qnWu+Rp7M7+aFtQ/vKp3mm31fB9FYVOzTAbaBu7lZ7S+h8Xi8zso0GpQaeo7vZUPD6Tvn7hT6A7Xj9iu+oY6lmeLbx781Z4j5YH8Im/Hn6qNS49ycXW8CrEO2aLk/W6siICg4Hf4fUqZXHZB5oI+IbJmV7Zbde7kn19ELZ7zJRTq8ybn0/CC6qYI380Sudfe8KGT2fNA3ZbS/Ek3hsG3JXG16tso1/VQOjDRLz71RtoH94RwCkWo+HEbuCbU+YGd/ijN1TYuO9VFiAIAlFwZg6+7oGa/h+E/CmSPfD8qCY2M/qg4+lJBm4Kk0dT74Itdoj3xQO6sPaMwlU+IxbsNVZmM0ahymf4XH5fDX0Vvhz2R4qn6XMBwtUkaCfEEQUvrp+SbMwvV4mtuBOYa6FjvupUt4jzULZNdzsPTcTLur132puWX6138zvMoP/9k=",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rajesh Patel",
      rating: 5,
      review: "Ordered a wedding anniversary cake and it exceeded all expectations! The vanilla sponge was light and fluffy, and the decoration was exactly what we wanted. The delivery was on time and the cake was fresh.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anjali Desai",
      rating: 5,
      review: "As someone with egg allergies, finding good cakes has always been a challenge. Sweet Delights has been a game-changer! Their eggless cakes taste even better than regular ones. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 5,
      review: "The red velvet cake was a hit at our office party! Everyone loved it and couldn't believe it was eggless. The texture was perfect and the cream cheese frosting was heavenly. Great service too!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAPveR3iBy5hxIC8zKJvPKziHdOviOBUebg&s",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Meera Iyer",
      rating: 5,
      review: "Ordered a custom birthday cake for my son and it was exactly what he wanted! The Spiderman design was perfect and the chocolate flavor was amazing. The cake stayed fresh for days. Thank you!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Arun Kumar",
      rating: 5,
      review: "Best eggless cakes in the city! The black forest cake was rich and delicious. The cherries were fresh and the chocolate shavings were perfect. Will definitely be a regular customer.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      date: "4 days ago"
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className="relative flex flex-col  md:flex-row items-center justify-between
  bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50
  p-8 md:p-16 min-h-screen overflow-hidden"
      >
        {/* Falling Snow */}
        <FallingSnow count={50} />

        {/* Garland */}
        <img
          src={garland}
          alt="Christmas Garland"
          className="absolute top-[55px] left-[-50px] w-72  opacity-80 pointer-events-none transform scale-y-110 rotate-[-25deg] hidden md:block"
        />


        {/* Bell */}
        <img
          src={bell}
          alt="Bell"
          className="absolute top-0 left-48 w-10 animate-bell opacity-80 hidden md:block"
        />
                    <img
              src={santa}
              alt="Santa"
              className="absolute right-[30px] top-[20px] w-24 animate-santa sm:block md:hidden"
            />
            <img
              src={santa}
              alt="Santa"
              className="absolute left-[500px] top-[230px] w-24 animate-santa hidden md:block"
            />
        {/* Left Content */}
        <div className="relative max-w-xl mb-10 md:mb-0 z-10 ">
                      {/* Santa */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Magical <span className="text-rose-400">Eggless</span><br />
            Christmas Cakes
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Celebrate the season with festive flavors and beautifully crafted
            eggless Christmas cakes.
          </p>

          <div className="relative flex gap-4 items-center">
            <button
              className="bg-rose-400 hover:bg-rose-500 text-white font-semibold
        px-6 py-3 rounded-lg shadow transition"
              onClick={() => navigate("/all-cakes")}
            >
              Explore Christmas Cakes
            </button>

            <button
              className="bg-emerald-100 hover:bg-emerald-200 text-gray-800
        font-medium px-6 py-3 rounded-lg shadow transition"
            >
              Order Holiday Treats
            </button>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-[800px] max-w-[800px] z-10">
          <div className="aspect-[4/3] rounded-2xl shadow-xl overflow-hidden">
            <img
              src={cake}
              alt="Christmas Cake"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>


      <Carousel data={Heroimages} height="534" width="534" show={3} />
      <CakeGallery />

      {/* Customer Reviews Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers who have experienced the magic of our eggless cakes!
            </p>
            <div className="flex justify-center items-center mt-4">
              <StarRating rating={5} />
              <span className="ml-2 text-gray-600">4.9/5 from 500+ reviews</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-rose-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                {/* Review Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-cake.jpg";
                    }}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <div className="flex items-center">
                      <StarRating rating={review.rating} />
                      <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 leading-relaxed">
                  "{review.review}"
                </p>

                {/* Verified Badge */}
                <div className="flex items-center mt-4">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-600 text-sm font-medium">Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
