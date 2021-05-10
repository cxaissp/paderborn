
## 答案文件
test2_model1.csv

## 训练好的模型文件
model1.m

## 代码默认的文件存储说明
code 代码
data 原始数据   
feature 特征提取后的数据  
model 模型
result 结果

## 提取第二组测试集的特征 test_feature_get.py
从data文件夹下读取数据testdatashuffle_2.csv，结果保存在feature文件夹下的feature_test2_mm.csv
    
## 通过随机森林进行预测 RFwithTest.py
从model文件夹下加载模型model1.m，从feature文件夹下读取特征提取后的结果feature_test2_mm.csv，结果保存在result文件夹下的test2_model1.csv

## 样本均衡 smote.py
均衡标签为3和4的样本，在训练模型阶段较好的提高了模型的准确度

## 代码的运行环境及库信息
版本：python 3.7
编译器：pycharm
库及对应的版本：
Pillow	8.1.2
PyWavelets	1.1.1
PyYAML	5.4.1
cycler	0.10.0
graphviz	0.8.4
imbalanced-learn	0.8.0
imblearn	0.0
joblib	1.0.1
kiwisolver	1.3.1
matplotlib	3.4.1
mxnet	1.7.0.post2
numpy	1.16.5
pandas	1.2.3
patsy	0.5.1
pip	18.1
pyparsing	2.4.7
python-dateutil	2.8.1
python-speech-features	0.6	
pytz	2021.1
scikit-learn	0.24.1
scipy	1.6.1
seaborn	0.11.1
setuptools	40.6.2
six	1.15.0
sklearn	0.0
statsmodels	0.12.2
threadpoolctl	2.1.0	