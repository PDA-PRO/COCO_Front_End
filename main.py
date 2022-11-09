from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pymysql

#회원가입 정보
class SignUp(BaseModel):
    name: str
    id: str
    pw: str
    type: int #1이면 학생, 2이면 선생

#아이디 중복 확인
class ID(BaseModel):
    id:str

#로그인
class LogIn(BaseModel):
    id: str
    pw: str

app = FastAPI()

#CORS(https://www.jasonchoi.dev/posts/fastapi/cors-allow-setting)
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# 미들웨어 추가 -> CORS 해결위해 필요(https://ghost4551.tistory.com/46)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

#아이디 중복 확인#######################################################
@app.post("/checkids/")
async def check_ids(id: ID):
    result = find_ids(id.id)
    return {"code": result} 

def find_ids(id):
    #MySQL 연결
    con = pymysql.connect(host='localhost', user='root', password='qwer1234',
                       db='coco', charset='utf8') # 한글처리 (charset = 'utf8')
    cur = con.cursor()
    sql1 = f"SELECT id FROM `coco`.`coco_student` where id = '{id}';"
    sq12 = f"SELECT id FROM `coco`.`coco_teacher` where id = '{id}';"
    cur.execute(sql1)
    rows1 = cur.fetchall()
    cur.execute(sq12)
    rows2 = cur.fetchall()
    con.close()
    if len(rows1) == 0 and len(rows2) == 0:
        return 1
    else:
        return 0
#########################################################################       


#회원가입 버튼 클릭 시 post##############################################
@app.post("/signup/")
async def create_user(user: SignUp):
    insert_db(user) #디비 확인
    return {"code":1}

#디비 확인
def insert_db(user):
    #MySQL 연결
    con = pymysql.connect(host='localhost', user='root', password='qwer1234',
                       db='coco', charset='utf8') # 한글처리 (charset = 'utf8')
    cur = con.cursor()
    sql = ""
    if user.type == 1:
        sql=  f"INSERT INTO `coco`.`coco_student` (`name`, `id`, `pw`) VALUES ('{user.name}', '{user.id}', '{user.pw}');"
    else:
        sql=  f"INSERT INTO `coco`.`coco_teacher` (`name`, `id`, `pw`) VALUES ('{user.name}', '{user.id}', '{user.pw}');"
    cur.execute(sql)
    con.commit()
    con.close()
#########################################################################   

#로그인#######################################################
@app.post("/login/")
async def login(user: LogIn):
    return {"code": check_db(user)}

#디비 확인
def check_db(user):
    #MySQL 연결
    con = pymysql.connect(host='localhost', user='root', password='qwer1234',
                       db='coco', charset='utf8') # 한글처리 (charset = 'utf8')
    cur = con.cursor()
    sql1 = f"SELECT id, pw FROM `coco`.`coco_student` where id = '{user.id}';"
    sq12 = f"SELECT id, pw FROM `coco`.`coco_teacher` where id = '{user.id}';"
    cur.execute(sql1)
    rows1 = cur.fetchall()
    cur.execute(sq12)
    rows2 = cur.fetchall()
    con.close()
    if len(rows1) == 0 and len(rows2) == 0:
        return 0
    else:
        if user.pw == rows1[0][1] or user.pw == rows2[0][1]:
            return 1
        return 0
#########################################################################   


