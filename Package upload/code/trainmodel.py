from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
from sklearn.metrics import precision_score, recall_score, accuracy_score, f1_score, roc_auc_score
import json
import joblib

train = 'D:\\KQQ\\Bearing\\xiang\\feature_train07demo_1.csv'

train_data = pd.read_csv(train)

train_data_y = train_data['label']
#除去标签的所有列就是特征
train_data_x = train_data.drop(['label'],axis=1)

clf = RandomForestClassifier(n_estimators=250,
                             max_depth=None,
                             min_samples_split=2,
                             min_samples_leaf=1,
                             max_features="auto",
                             max_leaf_nodes=None,
                            )

#模型训练
clf.fit(train_data_x,train_data_y)
#在这一步保存模型，dump函数的第二个参数就是保存模型文件的绝对路径
joblib.dump(clf,'D:/KQQ/Bearing/xiang/random_model_4.model')

#python D:\KQQ\Bearing\xiang\upmodel_2.py model=D:\KQQ\Bearing\xiang\random_model4.model test=D:\KQQ\Bearing\xiang\feature_train07demo_1.csv opath=D:\KQQ\Bearing\xiang\out.csv
#python D:\KQQ\Bearing\pei\featureget_havelabel.py path=D:\KQQ\Bearing\xiang\train07demo.csv opath=D:\KQQ\Bearing\xiang\feature_train07demo_1.csv
