import csv

from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
import sys
from sklearn.metrics import precision_score, recall_score, accuracy_score, f1_score, roc_auc_score
import json
from sklearn.feature_selection import VarianceThreshold
from sklearn.preprocessing import StandardScaler
import joblib

w_path1 = '../result/test2_model1.csv'
#w_path1 = '../result/test2_result1.csv'
#w_path2 = '../result/M07_result2.csv'

def write_csv(path, data_row):
    with open(path,'a+',newline='',encoding='utf-8') as f:
        csv_write = csv.writer(f)
        csv_write.writerow(data_row)

precision = 0
recall = 0
accuracy = 0
rocX = []
rocY = []
featureImportances = []
params = {}
params['n_estimators'] = 250
params['max_depth'] = None
params['max_features'] = "auto"
params['min_samples_split'] = 2
params['min_samples_leaf'] = 1
#params['train'] = '../feature/feature_M01_m.csv'
#params['train'] = '../feature/smote34_M01_1.csv'
params['train'] = '../feature/smote34_M01_3_1.csv'
params['test'] = '../feature/feature_M07_m.csv'
#params['test'] =
#params['real_test'] = '../feature/feature_test1_mm.csv'
params['real_test'] = '../feature/feature_test2_mm.csv'
argvs = sys.argv

for i in range(len(argvs)):
    if i < 1:
        continue
    if argvs[i].split('=')[1] == 'None':
        params[argvs[i].split('=')[0]] = None
    else:
        Type = type(params[argvs[i].split('=')[0]])
        params[argvs[i].split('=')[0]] = Type(argvs[i].split('=')[1])

train = np.array(pd.read_csv(params['train']))
train_y = train[:, -1]
train_x = train[:, :-1]

test = np.array(pd.read_csv(params['test']))
test_y = test[:, -1]
test_x = test[:, :-1]

clf = joblib.load("../model/model1.model")
predict = clf.predict(test_x)

judge0 = 0
judge1 = 0
judge2 = 0
judge3 = 0
judge4 = 0
#write_csv(w_path1, ['label'])
for i in range(0, len(predict)):
    print(predict[i], "    ", test_y[i])
    #write_csv(w_path1, [predict[i]])
    if test_y[i] == 0.0 and predict[i] == test_y[i]:
        judge0 += 1
    elif test_y[i] == 1.0 and predict[i] == test_y[i]:
        judge1 += 1
    elif test_y[i] == 2.0 and predict[i] == test_y[i]:
        judge2 += 1
    elif test_y[i] == 3.0 and predict[i] == test_y[i]:
        judge3 += 1
    elif test_y[i] == 4.0 and predict[i] == test_y[i]:
        judge4 += 1
judge = judge0*0.1 + judge1*0.2 + judge2*0.25 + judge3*0.2 + judge4*0.25
print(judge)

precision = precision_score(test_y, predict, average='micro')
recall = recall_score(test_y, predict, average='micro')
accuracy = accuracy_score(test_y, predict)
print('precision:', precision)
print('recall:', recall)
print('accuracy:', accuracy)

real_test = np.array(pd.read_csv(params['real_test']))
real_test_x = real_test[:, :]
real_predict = clf.predict(real_test_x)
write_csv(w_path1, ['label'])
print('录入数据')
for i in range(0, len(real_predict)):
    #print(predict[i], "    ", test_y[i])
    write_csv(w_path1, [real_predict[i]])

'''
res = {}
res['precision'] = precision
res['recall'] = recall
res['accuracy'] = accuracy
res['fMeasure'] = f1_score(test_y, predict)
res['rocArea'] = roc_auc_score(test_y, predict)
res['featureImportances'] = clf.feature_importances_.tolist()
print(json.dumps(res))
'''