# 

# 模型与材质

# 模型基础

## 渲染管线

![pipeline-20250713142925-asgf6hj](pipeline-20250713142925-asgf6hj.png)

> 蓝色背景为可编程部分，其中顶点着色器可以对模型的顶点进行相关的计算，而片元着色器则是对光栅化阶段插值的信息进行计算

## UV

在建模软件中进行UV展开，UV会放在一个横向为U纵向为V，范围(0-1)的二维坐标系中

![511db44e-7158-4743-b513-df79f668fd5d](assets/511db44e-7158-4743-b513-df79f668fd5d-20250717225952-uvgugdt.png)​

不同的贴图（漫反射贴图、法线贴图、高度贴图、金属度贴图、AO贴图）可以映射到这个展开的UV上

![215fbe4a-996f-4e0f-b19b-7052165b4626](assets/215fbe4a-996f-4e0f-b19b-7052165b4626-20250717230106-rh8tff4.png)​

## 模型信息

一个模型可能包含的信息：

- v：顶点坐标数据（模型空间中单个顶点的xyz坐标）
- vt（texcoord）：贴图坐标（uv坐标）
- vn（normal）：顶点法线
- 顶点色

> obj与fbx格式的区别
>
> ![tmpB37D](assets/tmpB37D-20250717230615-8jt25yx.png)​

# 材质基础

## 漫反射

光朝四面八方反射，Lambert光照模型认为光线是均匀反射出去的

Diffuse = baseColor *LightColor * dot(LightDir , Normal)

![44e8c7ac-9cbd-4a0a-b449-c115d66273e0](assets/44e8c7ac-9cbd-4a0a-b449-c115d66273e0-20250717230726-jxzmo6m.png)​

## 镜面反射

入射光根据表面法线进行反射，并且只有在反射方向有能量，其他方向均为0（入射等于出射）

Specular =  pow(saturate(dot(ReflDir,ViewDir)),32) * LightColor

![d56f5b62-4a68-42f2-abc2-ebac8a203da7](assets/d56f5b62-4a68-42f2-abc2-ebac8a203da7-20250717231122-vhc3cvz.png)​

粗糙镜面反射：法线偏移较小，反射依然集中在一个区域，有磨砂质感

![image 3](assets/image%203-20250717234007-d81kxxk.png)​

## 折射

一些特殊介质除了反射之外还会根据物体的折射率折射一部分光线进入物体之中

反射和折射能量的多少是根据菲涅尔定律决定

R = refract(View,Normal,ration)；ReflColor = tex2D(skybox,R)

![image 4](assets/image%204-20250717234051-lp41vgk.png)​

粗糙镜面折射：和粗糙镜面反射类似，也是较重在一个区域

![tmp966](assets/tmp966-20250717234133-ozvcf7j.png)​

## 多层材质

除了物体本身的材质以外，表面还有东西（可以看到材质本身和表面的一层）

![tmp51FA](assets/tmp51FA-20250717234152-f0rvymw.png)​

## 次表面散射

光线进入半透明材质表面后，在内部多次散射与吸收，然后从其他位置逸出，从而赋予物体柔和、乳状或蜡质的视觉效果

![6f234978-54d1-4986-bc7b-a15dd90bbc75](assets/6f234978-54d1-4986-bc7b-a15dd90bbc75-20250717234407-ybmgucp.png)​

把皮肤看做三层：油脂层（高光）、表皮层（颜色）、真皮层

![v2-ca9d665b85a79b934b7d8f5fc42338eb_1440w](assets/v2-ca9d665b85a79b934b7d8f5fc42338eb_1440w-20250717234316-ht5sjce.png)​

## 改变材质表面

![images](assets/images-20250717234733-xv7a5ci.jpg)​

模型表面在微观上总有凹凸，而光照计算（漫反射、高光、折射）都依赖法线方向。法线贴图将每像素的法线偏移存入纹理，在渲染时“伪造”几何细节，无需增加面数即可改变光照效果

# 模型数据

## 顶点动画

在顶点着色器中，修改模型的顶点位置，进而达到模型运动的效果

![f85bc798-0aad-4a7f-81b1-e30a5bb722a1](assets/f85bc798-0aad-4a7f-81b1-e30a5bb722a1-20250718001928-vho7jwq.png)​

- 顶点着色器计算的是模型的每一个顶点，每个顶点的数据是不同的，因此同一个计算公式在不同的顶点上，计算出来的结果也是不同的
- 顶点动画需要一定数量的顶点，效果才会比较明显
- 一个顶点传入顶点shader，顶点shader控制顶点位置时，所有的顶点都会进行一样的算法
- 在一些三维软件中，动画的K帧也是顶点动画

## 纹理动画

在片段着色器中，修改模型的UV信息，使得采样贴图时，发生位移而产生运动效果

![111](assets/111-20250718000847-73mt5a2.gif)​

原理分析

- 光照计算：利用法线贴图，改变反射和折射的朝向

  ![a0214b21-41e8-45f6-bf8f-ecdb536ad694](assets/a0214b21-41e8-45f6-bf8f-ecdb536ad694-20250718003647-1bnqxaa.png)​
- 改变UV采样点：产生动画效果

  ![tmp15A6](assets/tmp15A6-20250718003719-pchupa1.png)​

## 顶点色

顶点色是存储在模型顶点缓冲区里的 RGBA 值，在 GPU 渲染阶段，顶点着色器输出时，这些颜色会在像素级别通过插值传递到片元着色器

作用：在渲染时，影响输出结果，控制颜色范围（遮罩？）

![tmpAA7D](assets/tmpAA7D-20250718002451-24ddpt1.png)​

Maya中顶点色的绘制：

![tmpC163](assets/tmpC163-20250718003909-c0lqlj9.png)​

因四边面本质上还是三角面组合而成，所以在绘制时会出现三角形的分界

FragColor =  FinalColor * VertexColor

## 插值

三角形所在平面任意点（x，y）都可用三顶点（α β γ）的线性组合表示

![83bc6825-7ed1-4fb5-8966-e3cd830e4d60](assets/83bc6825-7ed1-4fb5-8966-e3cd830e4d60-20250718004011-wgdyyq8.png)​

任意一点的表示公式：

$\begin{aligned} (x, y) &= \alpha A + \beta B + \gamma C \\ \end{aligned}$

$\begin{aligned} \alpha + \beta + \gamma &= 1 \end{aligned}$

$\begin{aligned}  \alpha &= \frac{ - (x - x_B)(y_C - y_B) + (y - y_B)(x_C - x_B) }{ - (x_A - x_B)(y_C - y_B) + (y_A - y_B)(x_C - x_B) } \\ \beta &= \frac{ - (x - x_C)(y_A - y_C) + (y - y_C)(x_A - x_C) }{ - (x_B - x_C)(y_A - y_C) + (y_B - y_C)(x_A - x_C) } \\ \gamma &= 1 - \alpha - \beta \end{aligned}$  

重心坐标（D）不能保证投影（Projection）后不变，所以三维情况下要先找到重心坐标再插值

例子：

![3b10db34-9c0c-4d21-acdf-e1e85badcce4](assets/3b10db34-9c0c-4d21-acdf-e1e85badcce4-20250718004240-kdg83kp.png)​

B点的颜色是蓝色，C点是绿色，那么D点就是蓝色和绿色的线性组合（D点X轴是3，3/4 的绿色，1/4 的蓝色）

![3d7ee9fe-9729-43e0-bb2d-30f3fe36f454](assets/3d7ee9fe-9729-43e0-bb2d-30f3fe36f454-20250718004934-87088ag.png)​

> 这样计算出来的颜色，是线性空间的（线性空间不是色彩空间，是gamma的一种），需要进行伽马校正

## 法线

![tmpC1FF](assets/tmpC1FF-20250718005743-mwm34w9.png)​

- 效果展示

  ![08ed014a-87e9-43ee-811c-57b3c93f6d01](assets/08ed014a-87e9-43ee-811c-57b3c93f6d01-20250718001129-lbqokz9.png)​
- 原理

  ![e85a058d-6416-4acd-baaf-aad1fc98a1f8](assets/e85a058d-6416-4acd-baaf-aad1fc98a1f8-20250718001158-gg86ghg.png)​

  - 面法线未使用平滑时，三角形三个顶点共用一个法线，那么插值时，因为三个顶点的法线相同，所以插值的结果相同
  - 顶点法线使用平滑后，一个顶点一个法线，插值结果也就会不同
- 在模型中的存储方式

  ![tmp968](assets/tmp968-20250718010856-3802ka1.png)​

# 扩展

在NPR渲染中，通常在顶点着色器中，将顶点往法线方向偏移。然后再片段着色器中直接输出一个颜色，达到描边的效果，BackFacing描边时，线条之间断开就是因为没有使用顶点法线（没有进行平滑着色）

![2a502512-ba4f-47f0-9a74-ce574a253e0a](assets/2a502512-ba4f-47f0-9a74-ce574a253e0a-20250718010746-6956620.png)​

![64fbf980-c575-44eb-ad9a-c2cfa6ad75f1](assets/64fbf980-c575-44eb-ad9a-c2cfa6ad75f1-20250718010801-nxslpp6.png)​

# 补充

## 顶点色的其他作用

- 基础颜色渲染：轻量化的直接上色，但在低模时效果很差
- 遮罩控制：顶点色的通道（如 R、G、B、A）可作为 “遮罩”，控制其他渲染效果的权重或范围

  ![b3b3a11df2060df35066e5d9e30f461c](assets/b3b3a11df2060df35066e5d9e30f461c-20250718111426-b9stw7m.jpeg)​

  eg：红色通道控制整棵树的风摇曳效果，蓝色通道控制树枝的摇摆效果，绿色通道控制着树叶的颤动

- 信息烘焙：存储预计算数据，降低实时开销

  - 光照烘焙：将静态物体的光照（如漫反射、阴影）预先计算并存储到顶点色中，实时渲染时直接读取顶点色即可表现光照效果，无需实时计算复杂的光照方程
  - 环境信息：烘焙环境光遮蔽（AO）、反射探针（Reflection Probe）的颜色信息到顶点色，辅助表现模型的环境交互细节
- 制作流程辅助：标记与区分

## 光滑组对法线的影响

在建模软件中，每个多边形面都可以被分配到一个或多个光滑组。相同光滑组的面在渲染时会共享顶点法线，并进行插值，实现平滑过渡；不同组的面顶点法线则分离，从而在连接处产生硬边

![tmp7E2F](assets/tmp7E2F-20250718121332-9jbu1iz.png)​

光滑组和UV对法线的影响：

![v2-5705f6817b9befd91fdb70f13f352fa7_1440w](assets/v2-5705f6817b9befd91fdb70f13f352fa7_1440w-20250718123313-cxuw36g.jpg)​

- 光滑组相连的模型（2和4），法线贴图都存在大渐变色，导致模型的法线效果会很奇怪（平面上有发暗发亮的光影）
- 任意具有硬边或不同光滑组的地方，都要在 UV 上断开并留出空隙，以避免法线贴图接缝处出现异常（3和4）
- 锐角处一般划分为硬边/不同光滑组；钝角处则视高模结构是否连贯决定：若独立结构可断开，否则也可合并为软边光滑

> 不同软件对其的处理：
>
> |维度|3ds Max 光滑组（Smoothing Group）|Maya 软/硬边（Soft/Hard Edge）|Blender 平滑/平坦 + Auto Smooth + Mark Sharp|
> | ------| ------------------------------------------------------------| ----------------------------------------------------------------| ----------------------------------------------------------------------|
> |**名称**|Smoothing Groups|Soft Edge / Hard Edge|Shade Smooth / Shade Flat + Auto Smooth + Sharp|
> |**原理**|每个面通过“组号”决定是否共享顶点法线；同组插值，异组断裂|直接在边上标记“软”或“硬”，软边共享法线插值，硬边使用面法线|Shade 模式决定全局插值；Auto Smooth 按角度分裂；Sharp 按手动标记断裂|

# 参考

顶点色：[https://blog.csdn.net/ygtu2018/article/details/132999312](https://blog.csdn.net/ygtu2018/article/details/132999312)

法线与光滑组：[https://zhuanlan.zhihu.com/p/338940773](https://zhuanlan.zhihu.com/p/338940773)

[https://www.bilibili.com/video/av927172664/?vd_source=c41d98ac8b5596b7a275fc197c54cded](https://www.bilibili.com/video/av927172664/?vd_source=c41d98ac8b5596b7a275fc197c54cded)

‍


---

> 作者: 池边影  
> URL: http://localhost:1313/posts/%E6%A8%A1%E5%9E%8B%E4%B8%8E%E6%9D%90%E8%B4%A8/  

