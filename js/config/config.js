/**
 * 游戏相关配置
 * @type {Object}
 */
const CONFIG = {
    status: 'start', // 游戏开始默认为开始中
    level: 1, // 游戏默认等级
    totalLevel: 6, // 总共6关 最多设置8关
    numPerLine: 7, // 游戏默认每行多少个怪兽，最多9个
    canvasPadding: 30, // 默认画布的间隔
    bulletSize: 10, // 默认子弹长度,最大50
    bulletSpeed: 10, // 默认子弹的移动速度
    enemySpeed: 2, // 默认敌人移动速度
    enemySize: 50, // 默认敌人的尺寸
    enemyGap: 10,  // 默认敌人之间的间距，结合敌人尺寸，最大不超过怪兽能移动的范围
    enemyIcon: './img/enemy.png', // 怪兽的图像
    //怪兽的Base64图像
    enemyBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACACAYAAADTcu1SAAAaDklEQVR4Xu1dC3BUVZq+d0KIxgdJyBPlsQq6KsijtkYoQ7M77vIIIQEcZVEkuupAgA2lArM1o1AgM7XLyyKDCS7sDMQHq45AyIPHPglY4NRqQFBXUUfUJQ8wsO4MCiFm62vv3/Xn5Lxudyektbuqq29333vuOec73/865/zXdWLj5V6marZfpvta3/ZydYyugqY6mf63brziRBNopv8jvb+v67u6M2wqo6uDbf1szxPrYwuG7jzbMmz6wvc54Tbc942EC1T3DRfMcNsRLjCq67odzHAbHi6Asvv5AdPP9bZ1lHW67W+4h59zbetkfV53AWjb8eJ5fr+j4aY22XS4eI7p+2UD0tRY65GgODEc4Pg1Nscq0MR7+wWOn29zTF1gc59I+zV0fVcBGC3gqBwZkCpwqXF+AaSOl4Gl+88P+6KuI7sCQJPYExkjguT3u6o81Sg3sUkEy/a7LZBRBTGaANqwTsckDpwMRFtgbRloA4zsHNN1MiC7TKxGC0AT68IBDteIoOpANjHRhnkcHBybvnOwTGLWFlhf+jEaANqCp2OQCizd7wSYTk/qHHcRHOpgAk4GnglUE6BRBzFSAHXgqVhnYhWBZvOpA1E3km3A40CqjkXQ+XcRLJUEUOlOKyZGAqDOChT/U4k+FUg/8MSnDYgqZpuMGB3DVIB944lVG0BFME3sC8u4CRdAG+apDBEdKCJwpu8mnSgD0YZ9IlCm7yZAZaLVBGiXMdCGeTaMU4HDf6djE5C2otQEngoo/jsd24CqEqki23TiVQukXwb6ZZ4t2zhQImiq7ygb//H/VZaorIM4EDqARMDwXQaiSbyq3I+ImBgJgCojhbNBBqAMEBWAIkD4nuDpRzqWnSMCyTtJBADf2xgodCwCLANcBqYJSBtxaq0P/QCoEp22uk4FnAgeAUKfAIyDhe+9vN/4J51H18lED3U4gXbJA45/EoDiJ79WNghkTPWjG3VWq1KM2gIYCXgm4MSO58DhP3onesf4xBvg0SeO6U0MJRGLxnNWABgAxt+t3nd84o1z6BPH9JaBiP8AFP+PvvNPEcyoMNEGwGiBp2KaCCCAINAIlN6O49A7yTtOSkhI6H3PPfcMCgQCN9x4441Z/fr1y87IyEhPSkq6MikpKal3794417l48eIF7/XV6dOnz5w6darxo48+aqqrq/v41Vdf/aStre2i4zgXcCr7xDHeBDSBSGwlwLjIlTGzS0EMF0AbsWkSjaKIJOA4mwAAva90HOeKwYMHpy5evHj0HXfccduQIUOGJCcnX21lbytOOn/+/B9OnDhx4o033nhn9erVhz/88MOzjuN87TjOVx6YABZvzlhiMdefMnaqDB5ZtMeGkZ1aYQLQhn0mQ0XUaaI+w3cSh2AeMe0KAOY4TnJCQsJVTz755J9NmzYtd+jQobclJCRAdEb91dbW1nr8+PF3duzYcXDlypX/1dbW9kfHcc57gAJUYiWJWGKjH31poxet9aEtgCqL0y94okHC2YZjsA1Mwzs5MTHxmlWrVo2dOXNmXlZWVnbUEdMU2NTU1Lht27baJUuWHGhtbf0/D0iwkpgp6lHORplYVfmPKjaqGNmh1joAbdwEMtdF59vEOrIkuY4DeMmO41zlOM7VTz311A9LSkpmpqenZ3QncOK9zpw5c7q0tHTb008//TvHcf7gOA6xknSmKFpt2ch1o43DL3UtbAAUgRSjLGTtiY41N0448wg8siCJdUHgAoHAgA0bNjwwbNiw4ZcTOPHex44dO7pgwYLn6+rqPmVAcjaSJcstVs5E0VqVGTcikEYWqgC0YR8XnzKDRea/cfAAIHQcxOU1eK9atWpcSUnJ7KSkJPze414XLlz4urS0tGLJkiX7HceBWMUbIEI/kgsCRspAFMVqpNZpsH9MAMrYp9J7OgecuwXkxwX1HIBLS0tLr6ysLMrNzR3b41CTVOjgwYMHCgsLt7a0tJzxQIShAyBlIJpEqm7aiu4uhuFCtZIB6Id9fphHwOET4EFkXnPTTTddt2/fvscHDhx4QyyAR3U8efLkx+PHj1/3wQcf/I8HInQjB5EHAnQGjoqJVm6FDkAb9vE4pKjzeBSF3AS4CBCP8N2uHT169KDKysrFmZmZObEEHtW1ubm5obCwcPXhw4c/cRznS083krsh6kQxmiPTiTI2alloA6CN0cLFJwdO1HnEvD5jxowZVFtb+1RKSkpaLIJHdT537lxLXl7e04cOHQKI/+tZqTpx6sfFkLGwgzUqAihGWEhPinrPJDo5iGAdGEg6L+Xmm2++rq6u7qlYZZ444MDEQCDw9Pvvvw9xeo75jDBo4PzzeKpKJ5qMGqlINQFoyz7RTeABaLI2YbD0SUtLy3zrrbeejDWdZ5IS0ImjRo1a2dLS0uwxkSI4PEAuBsZtLFMtC20ANLFPBR7pPXLQr3UcJ/XgwYPFd955Z8DUIbH4/+uvv16Xm5tb7jgO4qnQiQARDr9OH8rmH1W6sJM1KgNQFKM6f08FHsU0yeIEeCmrV6/+q0WLFs2JRXBs67xmzZrnFi9e/C+eKAWIpA9lolQmTnUOfidH38ZlwEWqUJkMQB4eg8UJdyFl3Lhxg/fu3fvLnuqk2wJkOg/O/oQJE362f//+Dz0Q4V6QZSpOTen0IQEpgtaBhTYAigyUzZTLXAYSnX0cx0k7duzYT4cOHdqjwmMmMML9//jx40eHDRv2D47jtDB96EeUqpZldNKHKgBF48XG6qT5PHLYwT6EyNKWLl06bvny5QvD7ZBYvG7ZsmXrV6xYgZAbQETIjYfbaD5RFTeVzVxImWgTqCYGykJlKp8P7IPo7JOYmJjR0NCwpm/fvpmxCES4df7iiy+ac3JyFrW2tp5m/qGOhaqZfdVSjKAotQWQM1BndYKFFG0Jsm/9+vV5JSUlj4TbEbF8XWlp6eaFCxfWCiyULdOQMdEUYrMGUBSfKsOFz6YH2ZeQkJBx6tSpVd8Vh93vYIKD369fvyVtbW2chXxWn89c+LVIOwAo6jxip24hEp9hoJAZRCfFOlOXL1/+F0uXLv1e6T4R5BUrVqxftmzZf3i+ISaEoQtpjY2oC3ULpLj1GTrW+Xxc9+FYXMsiAgjjBeITERf4felHjx796e233z7S78j9Lp3/9ttv1w8fPhwWKaaeyLkHC2m2QsdCU3itXcU8letAIMrYB/DIeEkZMmTIgPfee6+0qxYgxQrIWCh1yy23lJw4cQIz+YiTwi/kyzFsWShbO2MEUKb/RJ+PxCcARMAaU0V9N23aNPWRRx6Z7bejL1269M2ePXuObd269d39+/dDd/wgEAhkFhUV3Tpp0qRbe/XqhTp12Qv3r6mpeff5559/t66uDnHNb8aNG5fx4IMP3jphwoRh4dx/8+bNFY8++uhOx3G+8KacEJ0hY0YGoCm8FnIpdAxU+X4qALnj3jcc8Xn27Nk/zp49e3t1dTVGKy3ZI9YnTZo0qf8LL7xQkJaWBjEd9VdLS8v5WbNm7dq9e/dnHkuoI4NLH/Pz8wdUVFRMT01NhZFm/WJiFABiyolipCQ+RTFqCnIbAZSFzrj1yRfh4nfoPwAI9qUkJCSkf/nll2V+Ft1i5E+bNu2F6upqzKuRvwSHNgQgGD5p0qRBu3btuiccJuh6HPcvKCh4dffu3bg/LVbiAAbbmJ+fP2jHjh2z/Nwfi4evvfbaeW1tbdCDEKMwZqiNnIEEpLhgmMQnOfhKAGUzD6rJWr6mk+u/tJkzZ4586aWXllsPUcdxampqjuTn51czHUEz1nT/kIiurKycWFBQcJuf8k3nVlZWvjN16tQ9goijldXoFwzUoI6vqanJz8vLG2Eqk/9/3333Ldu2bVu95xOKelAVIxX3W3SapZDN9+lin6L4JCaS+xB03svLywvnzp1b5KeBM2bMeOGVV175wBMvpB+4JUzzildPnz59yGuvvfZjP+Wbzr377rt/u3379hNsWQSsRB6TpCBF8r333nvTyy+/PMtUJv9/48aNW4uLiysFpx4sJAbaiFFfAOqiL3wnEI5pGXzQfdi7d+/D48ePH++ngVlZWeuam5uhI6AfqDEoglwYEtNXpaenp58+fXqun/JN52ZkZGw8c+YMRByxgwOIy8lYS87MzOzb1NT0uKlM/v++ffv2TZgw4Z+YOwF/EG+uB1VLEpXuBI1w6ihb94EaQ0DySduMY8eO/d3QoUNv99PArKysZ5qbm9GBNH+GkdnTAAzOb2ZmZqY3NTU95qd9x48ff3vYsGF/7zgOLGs+2Stb2S0ugOKbZDq4E+ECKNvTEAyfgYGNjY2rsrKy+vlp4IwZM15kIpRmsDmAxPTuEqFkBVPUg1YYkAi930/7mpqaTmVnZy/xGEiLn8RdTzKnXqcHg+LJZt0LWaAy65M2pcC0TwWAZ8+eXZ+SkoJj61d1dfXRKVOm1LDdQGgMB5CMmKt27tw5sbCwsKuMGFrfCT3MrT4aQMlVVVWT8/Pzfc1tnjt37mxqairCipAyWHLBXQkxKiPuelJtjNECSDpQN+tOTAzNvDuOk3H+/PmyK6+80pevBjN+6tSp22pqamDG09wZRj+3AK+YOHHioKqqqh/7MeNtRhHuP2XKlN/u2bOH7k8GBtUhaERNnjx50M6dO2f6vf9XX311Pjk5eZ4nQikiQzpQJUbJnSAdKE70hgDkLDQFsDkL+QaVoA/oOE7mpUuXNiUkJAB4Xy848rNmzaqsra2FI01GBOoWtAAnTpzY/8UXX8zvSkf+/vvvr96zZw/uT5YwOg99kpiXl4dAQqFfRx6d0NbW1tarV69HHcdBdIf7ggCPL3oSDRnV1m0UGwyliWJUB6BsF21INxGA7e3tsLbCeoEJtbW171RUVLxXV1d3pr293Q0EAhmzZ8++ZfLkybf4Hfl+K+GF0t7z7n/add32QCCQjvvn5eXdFsn9Xdd9WABQxUDu0EcFQNnMO4lPHoWB3suIBEC/HR5L53sAwgqFDuTRGFtLlLsTvhgoi3/yDBGkAwFgZnt7++ZY6tjuqqvruliZABEKAGm1GoGnm16S7bXvBKAqjCYaMaILwUUoMTAOoGRUeAByBspEqMqZl65UE0GTOfImAEURCgZu6q5RHUv3cV2XjBidCI0KgKowmmjEkBgVRWgcQDkDOYBchJIVKk4v8VkJaThNxUAbAEUdCDeCRGgcQDWAKhEqcyUiAlC2DlTmA4o6ECL0H2NJtHVXXV3X/QkzYmiBEzdiZAwUEwh1mJHQMVCcBwzOSrOoPM9XRpO5ZIXGAZQzUASQL/QVGajKAhU2gLJVaBTgJR2I3bbwA+MAqgGECMVye9KBPNGe7wVOfhjIAeSuRGiilenAOIB6AMkKpZivmPVJ3AiqnJGIA9hdChAxy291oGjEcAvU99KKSAHkbgS3QuMMtGcgD2bHAexGQvm+lYKBcQB99+RluiAO4GXq+GjdNhYAhBuRHncj5JB7AGJJBdwI7siLhky3WaGiEUN+4HPRGrXfpXJc10WGDvID4wDGGrhxAGMNMaG+cQDjAHaa1I22Ix/XgZpBFgsMpPnAeCQmHomJcXkZBzAOIHuqWnw2oicMh544G8EndOOzEYZR0pMBpCUV8Rl5vRVK84EUSuNLKnQbXLpchMbXxFjIaMmipssGIGWm4NvLSITGV6UpwLRYldZta2J0AGJRU3xdaHjrQrsFQNofr9vcEgdQDaBuc4spU0VUQmliggPZ9rL45hY5gNidFMn2sogAFBf28qWFfG9EfH+gWgdigycBKG4v4wuaZHvkpZkqbIPZlO5KtUM3lGbL2x8Y9g5dC2MuZk+R7NBVZalQ7dD1xUBVjlAZiAAQWZqQZgRW6K9jtpe7sOKu6/6NtzcCaUaQCF31cGXrFMzh7A8UdSClGYEbQQD+pgv7IWaLdl33IQYgbbE2rcoWU09a7Y0g9qmy9MoyNXEAt8RsL3dhxV3XfdAAoOkhWdJcaTZ6UEz0QwDyXNmUZgRGzNYu7IeYLdp1XSQAhBEjphkR/T+VEWMEEJ1jyhMjbnKhNIwcwAo/vVxfX/9RWVnZG7t27cLj25wpU6b0nz9//h0jR478Ez/l0Llvvvnm78vLy39XVVX1uVfe9fPnz/9hhOW9UVVVhfwxTkFBwXWo34gRI270Uz/XdZHBWATQNlshz9aE2wbB9JsnRpZuJJRHk+WJed62YRUVFfuLior+lWXIxaXQq8lbtmz5UVFRka/n6m7ZsuXAQw899O8sEyCVd8WWLVvuKioqyrWtG85j5VEWRfwcbHNFRcVfPvDAA+Nsy3Nd9wGWJ4ayIqpSLltlsDcBSGmu+POSZClHQsnOvf2BL9o06siRIx+OHDkSLgcpdFQa9wxtWauvr3/QdqSDyaNGjYL45msuQwAio3B9fX2Rz/Kgz6k8LMDFyA9JnSNHjjw8fPjwwTbtdV0XCfKIgSYAye+jxLdivrQgC2UAkgHDDRmerZ4fk0uBRHTciHnJpkHz58//dVlZ2REBQFwaAnDOnDkjN27caJU8fe7cuRXPPfcclUcpPDoAOGfOnBE+y0OWXQ5giIFo87x580Y8++yzcA+ML9d17xOMGHoknSwzhVXebD8AiiASeBiNAJDSTcIP/GdjaxzH6dev388bGhoQG0QHUWMIQJR5TXZ2dlZDQ4NV+uacnJxljY2NKA8+FuU6IwCpvEyf5TWx8sBAAjA4aHNycjJPnTr1C5v2uq771wxAMJA/U5AbLibx2eHBH7qUk2KiA/G5EfSdAESyO1ihr1g2qISlXqT0jtThJJZT29vb11mW9wTLgkTZBjljMMhQ3lrL8pCVl7IqkdONS9FuesgJyiu1LO9eQYQSgLQfXpXoVRZG6yBC8UWWqUkmRmW+oQjgq5YNKmYA0gaPUHZCTyyjg35lWd7fsjxkPGksLf0IzlmGWR7PXhhK/uqVh8euGl+u696jAFB8bpJJfJI7ocwXSmDKGCgCiO9gCx76EUz42t7evt3Ymm+3HCPxDSU/pdHI84OCMWnt7e22HUQDghsIMgb6KY8SEvD8oaQ2gklubec/XdedzhK+0qMNeDYKmehUpVsOPfyK5wq1YaEKQMxIIJQGEYrs7MaXF5kgACnZG9dZJPKsguNesJhEHi+PJqAjKY/rVCqPALSKPLmuW+gxELFQegiWCUDt85NU+k+WM00WXhOf6YCAdkZra+trvXr1AqDKV2tr64XevXsjNoioBI1GUs4oF9ejg1IuXry4OTExESw3lYf5NnqOOxiDziGdRYnZwy0PHU7loS9I6qC835jqd+nSpa8TExPv9gCEkUWP3+ELlmSP3JEmufPcGWm+bNKHFJER9aA4SxHMZsue3JL22Wef/er666+/Vdfhn3766X8PHDjwZ96jaHiKZepwegJ2n08++eQXAwcOvFlX3smTJ98fNGjQk155lPmeA8jLW2lZ3s8V5XFftc/Jkyd/OWDAgD/V1e/zzz9/t3///tDR4oo07u9xX08UnfRf0HjhkRhuwPBjrgc5iCKgNNFLVlmfsrKyvOLiYnSm8vXMM8+sfvzxx/+NuRAwozkDQ7Mca9asueuJJ56Ahal8rV27du2iRYuoPLIYOYDRLK+DobVu3bq7HnvsscW6+pWXl6+cN28enuZJz04ikSxLpcXBkzEwBKKo/2QAio69DEDSCaGJ3UOHDi0YPXo0REan18GDB3eOHTsWG2D4w4Gp0rx8Ys01dXV1j44dOxY6pNPrwIEDlYFAAOtwSDRRvm0OIEkKGFuRlEc5tKm84MOeDxw48JPc3NypsvodPnz4tTFjxmxQPDdJBaDx2YEUiTExUGSijI0UXqMODz4Esry8/K6CgoLpmZmZwaBvY2Pjx5WVlTsXLFjwn17aff6QD+psLsLJ2kOnX7V+/fpx06ZNK8zJyQkGuRsaGn6/Y8eOyoULF+Jp0fxxAaRLiNFc7IceXxBBeSTmaeCifskbNmz488LCwqnZ2dk34ITm5uaPdu3atb24uBiSgR72wdvM66kSmZ1mILxBEgpmywDUiVIVI/kcIT2KB0CClRBfuA4VBjsg4vhsdMivYSOYdDD5XPR8JgBAGfFRHkQRWXTk+9Ho5YSIdnk0sGltEOqHNwYx6oc6QC2gnQiE80ft8CUTnGlcXOpEp1SEEmgqMSpapiIzxcy+6Gh6pjz+w/moLI++i5XkHc7vxwcH3QfnkgnOFwTJBgOVS2WGUx6xWSyLs5vCi7ytGFR487AZ1VsUkzqLk7erQyhNBM4kUrl1qjJ0uK9Ix9QosSL0nfSxCkSR+QSgSlfI1BEfFJGWh/vy8sSBT4NVtDJNBorWaGHiM8hCbsTogBQbbvpO/iHvJF4+iQBZJ+s6XiyDl8MHhmww8HOp/rbl2dST3zPEEPb4Hl1ERabnxN/EtnYAUGSdiYW6kSeCKytL1nE2ndSTz+GgUWfz31Qg8XO1BgtrfGiw8lGjYyP/Txy9OsBMDO/JgIRTNxmIIkAqwHTnSdknskDsbB1zTICqrpUxTyXuwunAy3GNaNzw7yIDdcyU/Sf+1glIHQN5Z8uYZPubaqBcjs7ujnuqABQ73yRyZayzAtDETJNYVDGZOi/WGWcaBDIAlSKQhQ914pfu2alssTNlnS9joo6dqvNl4tPUGbH6v0qs2rBTxTzp7yoATWLPD8tkjPuuslAEjne6zbGNPu1Qjg5Ak8Eh058qMfldBcwkIXSA2AAqE51aAE3MM4Gq03PfNxBNbDSCw0aHSq+GJnTFkaRjl8kYUQEVB/DbnpMBa/t7p2v9dLYOABM4pv9NoihW/1eBpWIfb6cVg8MBxQYMm3NiFZRI6m0C1JaJoTrYdHQ4IEfSyO/jtTpgtaDbAGjSeTr9+X0Ew9RmGxbqmNihfD8AxoEyQRPZ/7bARg1A2+pGMkhs79GTzwsLGNsG/T/pEGyYur8FjAAAAABJRU5ErkJggg==',
    enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
    enemyBoomFrameNumber:5,//敌人爆炸帧数
    enemyDirection: 'right', // 默认敌人一开始往右移动
    planeSpeed: 5, // 默认飞机每一步移动的距离
    planeSize: {
        width: 60,
        height: 100
    }, // 默认飞机的尺寸,
    planeIcon: './img/plane.png',
};
