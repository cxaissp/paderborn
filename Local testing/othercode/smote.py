# 使用sklearn的make_classification生成不平衡数据样本
import csv
import numpy as np
from sklearn.datasets import make_classification
from collections import Counter
from imblearn.over_sampling import SMOTE
'''
# 生成一组0和1比例为9比1的样本，X为特征，y为对应的标签
X, y = make_classification(n_classes=2, class_sep=2,
                       weights=[0.9, 0.1], n_informative=3,
                       n_redundant=1, flip_y=0,
                       n_features=20, n_clusters_per_class=1,
                       n_samples=1000, random_state=10)

# 查看所生成的样本类别分布，0和1样本比例9比1，属于类别不平衡数据
print(Counter(y))
print('X', X)
print('y', y)
# Counter({0: 900, 1: 100})
'''
r_path3 = '../feature/feature_M01_m.csv'
w_path = '../feature/smote34_M01_3_1.csv'
x3_feature = []
x3_label = []
x4_feature = []
x4_label = []
other_feature = []
other_label = []

def write_csv(path, data_row):
    with open(path,'a+',newline='',encoding='utf-8') as f:
        csv_write = csv.writer(f)
        csv_write.writerow(data_row)

with open(r_path3, 'r', encoding='UTF-8') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[-1] != 'label':
            if row[-1] == '3.0':
                x3_feature.append(row[:-1])
                x3_label.append(row[-1])
            elif row[-1] == '4.0':
                x4_feature.append(row[:-1])
                x4_label.append(row[-1])
            else:
                other_feature.append(row[:-1])
                other_label.append(row[-1])
        else:
            title = row
write_csv(w_path,title)

x_feature = np.asarray(x3_feature + x4_feature)
x_label = np.asarray(x3_label + x4_label)
print(Counter(x_label))
#print(nx3_feature)
#print(nx3_label)

# 使用imlbearn库中上采样方法中的SMOTE接口
# 定义SMOTE模型，random_state相当于随机数种子的作用
smo = SMOTE(sampling_strategy = 1, random_state = 42)
feature_smo, label_smo = smo.fit_resample(x_feature, x_label)

print(Counter(label_smo))
# Counter({0: 900, 1: 900})

l_feature = feature_smo.tolist()
l_label = label_smo.tolist()
print(type(l_label))
print(type(other_label))

all_feature = other_feature + l_feature
all_label = other_label + l_label
for i in range(0, len(all_feature)):
    temp = []
    for j in all_feature[i]:
        temp.append(j)
    temp.append(all_label[i])
    write_csv(w_path, temp)
