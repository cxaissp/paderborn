import lightgbm
from lightgbm import *
from sklearn.metrics import explained_variance_score,mean_absolute_error,mean_squared_error,median_absolute_error,r2_score
import pandas as pd
import numpy as np
import sys
import json
import joblib
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
from sklearn.metrics import precision_score, recall_score, accuracy_score, f1_score, roc_auc_score
import json
import joblib
from sklearn.preprocessing import label_binarize


class Result:
    precision = 0
    recall = 0
    accuracy = 0
    rocX = []
    rocY = []
    featureImportances = []
params = {}
params['model'] = '/usr/local/data/upload/model/model1.model'
params['test'] = '/usr/local/data/lab_shouce/feature_M07_m_demo_new.csv'
params['opath'] = '/usr/local/data/out.csv'
argvs = sys.argv
try:
    for i in range(len(argvs)):
        if i < 1:
            continue
        if argvs[i].split('=')[1] == 'None':
            params[argvs[i].split('=')[0]] = None
        else:
            Type = type(params[argvs[i].split('=')[0]])
            params[argvs[i].split('=')[0]] = Type(argvs[i].split('=')[1])

    model = joblib.load(params['model'])


    test_csv = pd.read_csv(params['test'])
    test_x = test_csv.drop(['label'], axis=1)
    test_y = test_csv['label']

    predict = model.predict(test_x)


    precision = precision_score(test_y, predict, average='micro')
    recall = recall_score(test_y, predict, average='micro')
    accuracy = accuracy_score(test_y, predict)
    res = {}
    res['precision'] = precision
    res['recall'] = recall
    res['accuracy'] = accuracy
    res['fMeasure'] = f1_score(test_y, predict, average='micro')
    try:
        labels = [0, 1, 2, 3, 4]
        test_y0 = label_binarize(test_y, classes=labels)
        predict0 = label_binarize(predict, classes=labels)
        res['rocArea'] = roc_auc_score(test_y0, predict0, multi_class='ovr')
    except ValueError:
        pass
    res['featureImportances'] = model.feature_importances_.tolist()
    print(json.dumps(res))

    y_pred = pd.DataFrame(predict)
    y_pred.to_csv(params['opath'], index=False)  # 分类模型的预测结果文件保存

except Exception as e:
    print(e)